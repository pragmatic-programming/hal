import { Edge, Node } from "reactflow";
import ELK, { ElkExtendedEdge, ElkNode, LayoutOptions } from "elkjs/lib/elk-api";
import { sourcePosition, targetPosition } from "./flow/LayoutDirectionIndicator";
import { FlowState } from "../processor/FlowState";
import { strictNode, StrictNode } from "../model/node/StrictNode";
import { NodeData } from "../model/node/NodeData";

const elk = new ELK({
    workerFactory: function (url) { // the value of 'url' is irrelevant here
        const {Worker} = require("elkjs/lib/elk-worker.js"); // non-minified
        return new Worker(url);
    }
});

export async function layoutedNodes(flowState: FlowState, layoutOptions: LayoutOptions) {
    const nodeMap = new Map<string, Node>();
    const graph: ElkNode = {
        id: "root",
        layoutOptions: layoutOptions,
        children: flowState.nodes.map((node: Node): ElkNode => {
            nodeMap.set(node.id, node);
            return {
                id: node.id,
                width: node.width ? node.width : 100,
                height: node.height ? node.height : 100,
            };
        }),
        edges: flowState.edges.map((edge: Edge): ElkExtendedEdge => ({
            id: edge.id,
            sources: [edge.source],
            targets: [edge.target]
        })),
    };

    const nodes: Node[] = [];

    const root: ElkNode = await elk.layout(graph);

    if (!root.children) {
        throw new Error("Children are undefined");
    }
    root.children.forEach((child: ElkNode): void => {
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
    });
    return nodes;
}
