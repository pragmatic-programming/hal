import { Edge, Node } from "reactflow";
import ELK, { ElkExtendedEdge, ElkNode, LayoutOptions } from "elkjs/lib/elk-api";
import { sourcePosition, targetPosition } from "./flow/LayoutDirectionIndicator";
import { NodesAndEdges } from "../model/NodesAndEdges";
import { strictNode, StrictNode } from "../model/node/StrictNode";
import { NodeData, NodeDataHierarchy } from "../model/node/NodeData";

const elk = new ELK({
    workerFactory: function (url) { // the value of 'url' is irrelevant here
        const {Worker} = require("elkjs/lib/elk-worker.js"); // non-minified
        return new Worker(url);
    }
});

export async function layoutedNodes(nodesAndEdges: NodesAndEdges, layoutOptions: LayoutOptions): Promise<NodesAndEdges> {
    const nodeMap = new Map<string, Node>();
    const nodeElkMap = new Map<Node, ElkNode>();
    const elkNodeMap = new Map<ElkNode, Node>();
    const children: Node[] = [];
    const rootElkNodes: ElkNode[] = [];
    const elkEdgeEdgeMap = new Map<ElkExtendedEdge, Edge>();

    // Create elk nodes for each node and store them in a map.
    // Nodes that appear to be in a hierarchy are stored separately to allow post processing.
    for (const node of nodesAndEdges.nodes) {
        const elkNode = {
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

    // Go through all nodes that are included in a hierarchy and and add the correct parent node id.
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
    console.debug(graph);
    const root: ElkNode = await elk.layout(graph);

    
    // Apply the node position and sizes to the flow graph.
    if (!root.children) {
        throw new Error("Children are undefined");
    }
    const nodes: Node[] = applyLayoutData(root, nodeMap, layoutOptions);

    return {nodes: nodes, edges: nodesAndEdges.edges};
}

function applyLayoutData(elkNode: ElkNode, nodeMap: Map<string, Node>, layoutOptions: LayoutOptions): Node[] {
    const nodes: Node[] = [];

    if (!elkNode.children) {
        return nodes;
    }

    for (const child of elkNode.children) {
        const node: StrictNode<NodeData> = strictNode(nodeMap.get(child.id));
        if (!child.x) {
            throw new Error("Child.x is undefined");
        }
        if (!child.y) {
            throw new Error("Child.y is undefined");
        }
        node.sourcePosition = sourcePosition(layoutOptions);
        node.targetPosition = targetPosition(layoutOptions);
        node.position = {
            x: child.x,
            y: child.y,
        };
        nodes.push(node);

        if (child.children) {
            (node.data as NodeDataHierarchy).width = child.width ? child.width : 800;
            (node.data as NodeDataHierarchy).height = child.height ? child.height : 800;
            const subNodes = applyLayoutData(child, nodeMap, layoutOptions);
            nodes.push(...subNodes);
        }
    }

    return nodes;
}

function applyHVLayout(nodes: ElkNode[], elkEdgeEdgeMap: Map<ElkExtendedEdge, Edge>, layoutOptions: LayoutOptions, hvToggle: boolean = true) {
    const direction = hvToggle ? "DOWN" : "RIGHT";
    for (const node of nodes) {
        if (node.children) {
            node.layoutOptions = {
                // ...layoutOptions,
                "elk.direction": direction
            };
            applyHVLayout(node.children, elkEdgeEdgeMap, layoutOptions, !hvToggle);

            if (direction === "DOWN") {
                if (node.edges) {
                    for (const elkEdge of node.edges) {
                        const edge = elkEdgeEdgeMap.get(elkEdge);
                        if (edge) {
                            edge.sourceHandle = "bottom";
                            edge.targetHandle = "top";
                        }
                    }
                }
                }
        } 
    }
}