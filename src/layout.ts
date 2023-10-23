import { State } from "./State";
import { Edge, Node } from "reactflow";
import ELK, { ElkExtendedEdge, ElkNode, LayoutOptions } from "elkjs/lib/elk-api";

const elk = new ELK({
    workerFactory: function (url) { // the value of 'url' is irrelevant here
        const {Worker} = require("elkjs/lib/elk-worker.js"); // non-minified
        return new Worker(url);
    }
});

export async function layout(getState: () => State, getNode: (id: string) => (Node | undefined), layoutOptions: LayoutOptions = {}) {
    const options = {
        ...layoutOptions,
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
        "elk.layered.spacing.nodeNodeBetweenLayers": "200",
        "elk.spacing.nodeNode": "400",
    };

    const graph: ElkNode = {
        id: "root",
        layoutOptions: options,
        children: getState().nodes.map((node: Node): ElkNode => ({
            id: node.id,
            width: node.width ? node.width : 100,
            height: node.height ? node.height : 100,
        })),
        edges: getState().edges.map((edge: Edge): ElkExtendedEdge => ({
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
        const node: Node | undefined = getNode(child.id);
        if (!node) {
            throw new Error("Node is undefined");
        }
        if (!child.x) {
            throw new Error("Child.x is undefined");
        }
        if (!child.y) {
            throw new Error("Child.y is undefined");
        }
        node.position = {
            x: child.x,
            y: child.y,
        };
        nodes.push(node);
    });
    return nodes;
}
