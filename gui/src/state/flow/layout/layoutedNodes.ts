import { Edge, Node } from "reactflow";
import ELK, { ElkExtendedEdge, ElkNode, LayoutOptions } from "elkjs/lib/elk-api";
import { NodesAndEdges } from "../../../model/NodesAndEdges";
import { applyLayoutData } from "./applyLayoutData";
import { applyHVLayout } from "./applyHVLayout";

const elk = new ELK({
    workerFactory: function (url) { // the value of 'url' is irrelevant here
        const {Worker} = require("elkjs/lib/elk-worker.js"); // non-minified
        return new Worker(url);
    }
});

export async function layoutedNodes(nodesAndEdges: NodesAndEdges, layoutOptions: LayoutOptions): Promise<NodesAndEdges> {
    const nodeMap: Map<string, Node> = new Map<string, Node>();
    const nodeElkMap: Map<Node, ElkNode> = new Map<Node, ElkNode>();
    const elkNodeMap: Map<ElkNode, Node> = new Map<ElkNode, Node>();
    const children: Node[] = [];
    const rootElkNodes: ElkNode[] = [];
    const elkEdgeEdgeMap: Map<ElkExtendedEdge, Edge> = new Map<ElkExtendedEdge, Edge>();

    // Create elk nodes for each node and store them in a map.
    // Nodes that appear to be in a hierarchy are stored separately to allow post-processing.
    for (const node of nodesAndEdges.nodes) {
        const elkNode: ElkNode = {
            id: node.id,
            width: node.width ? node.width : 100,
            height: node.height ? node.height : 100,
        };
        nodeElkMap.set(node, elkNode);
        elkNodeMap.set(elkNode, node);
        nodeMap.set(node.id, node);

        if (node.parentNode) {
            children.push(node);
        } else {
            rootElkNodes.push(elkNode);
        }
    }

    // Go through all nodes that are included in a hierarchy and add the correct parent node id.
    // Also propagate the layout options to the nested hierarchy nodes as elk options only work for the current hierarchy level.
    for (const child of children) {
        const elkNode = nodeElkMap.get(child)!;
        const parentElkNode = nodeElkMap.get(nodeMap.get(child.parentNode!)!);
        if (!parentElkNode) {
            throw new Error("ParentElkNode is undefined!");
        }
        if (!parentElkNode.children) {
            parentElkNode.children = [];
        }
        parentElkNode.children.push(elkNode);
    }

    // Create the elk root node.
    const elkEdges: ElkExtendedEdge[] = [];
    for (const edge of nodesAndEdges.edges) {
        const elkEdge: ElkExtendedEdge = {
            id: edge.id,
            sources: [edge.source],
            targets: [edge.target]
        };
        elkEdgeEdgeMap.set(elkEdge, edge);
        elkEdges.push(elkEdge);
    }

    for (const edge of [...elkEdges]) {
        const source = edge.sources[0];
        const sourceNode = nodeMap.get(source);

        if (sourceNode && sourceNode.parentNode) {
            const elkParentNode = nodeElkMap.get(nodeMap.get(sourceNode.parentNode!)!);
            if (elkParentNode) {
                elkParentNode.edges = elkParentNode.edges || [];
                elkParentNode.edges.push(edge);
                elkEdges.splice(elkEdges.indexOf(edge), 1);

            }
        }
    }

    const graph: ElkNode = {
        id: "root",
        layoutOptions: {
            // ...layoutOptions,
            "elk.direction": "DOWN"
        },
        children: rootElkNodes,
        edges: elkEdges
    };

    applyHVLayout([graph], elkEdgeEdgeMap, layoutOptions);

    // Do the actual layout.
    const root: ElkNode = await elk.layout(graph);

    // Apply the node position and sizes to the flow graph.
    if (!root.children) {
        throw new Error("Children are undefined");
    }
    const nodes: Node[] = applyLayoutData(root, nodeMap, layoutOptions);

    return {nodes: nodes, edges: nodesAndEdges.edges};
}