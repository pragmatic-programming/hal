import { Edge, Node, Position } from "reactflow";
import ELK, { ElkExtendedEdge, ElkNode, LayoutOptions } from "elkjs/lib/elk-api";
import { StateReactFlow } from "./reactFlow/StateReactFlow";

const elk = new ELK({
    workerFactory: function (url) { // the value of 'url' is irrelevant here
        const {Worker} = require("elkjs/lib/elk-worker.js"); // non-minified
        return new Worker(url);
    }
});

export async function layoutedNodes(stateReactFlow: StateReactFlow, layoutOptions: LayoutOptions = {}) {
    const options: LayoutOptions = {
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
        "elk.layered.spacing.nodeNodeBetweenLayers": "400",
        "elk.spacing.nodeNode": "400",
        "org.eclipse.elk.spacing.nodeNode": "30",
        ...layoutOptions,
    };

    const nodeMap = new Map<string, Node>();

    const graph: ElkNode = {
        id: "root",
        layoutOptions: options,
        children: stateReactFlow.nodes.map((node: Node): ElkNode => {
            nodeMap.set(node.id, node);
            return {
                id: node.id,
                width: node.width ? node.width : 100,
                height: node.height ? node.height : 100,
            };
        }),
        edges: stateReactFlow.edges.map((edge: Edge): ElkExtendedEdge => ({
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
        const node: Node | undefined = nodeMap.get(child.id);
        if (!node) {
            throw new Error("Node is undefined");
        }
        if (!child.x) {
            throw new Error("Child.x is undefined");
        }
        if (!child.y) {
            throw new Error("Child.y is undefined");
        }
        node.sourcePosition = layoutOptions["elk.direction"] === "DOWN" ? Position.Bottom : Position.Right;
        node.targetPosition = layoutOptions["elk.direction"] === "DOWN" ? Position.Top : Position.Left;
        node.position = {
            x: child.x,
            y: child.y,
        };
        nodes.push(node);
    });
    return nodes;
}
