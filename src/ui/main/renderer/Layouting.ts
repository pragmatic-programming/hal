import ELK, { ElkExtendedEdge, ElkNode } from "elkjs/lib/elk-api";
import { Edge, Node, useReactFlow } from "reactflow";
import { useCallback } from "react";

const elk = new ELK({
    workerFactory: function (url) { // the value of 'url' is irrelevant here
        const {Worker} = require("elkjs/lib/elk-worker.js"); // non-minified
        return new Worker(url);
    }
});

export const useLayouting = () => {
    const {getNodes, setNodes, getNode, getEdges, fitView} = useReactFlow();

    const defaultOptions = {
        "elk.algorithm": "layered",
        "elk.layered.spacing.nodeNodeBetweenLayers": 100,
        "elk.spacing.nodeNode": 80,
    };

    return useCallback((options: any) => {
            const layoutOptions = {...defaultOptions, ...options};

            const graph: ElkNode = {
                id: "root",
                layoutOptions: layoutOptions,
                children: getNodes().map((node: Node): ElkNode => ({
                    id: node.id,
                    width: node.width ? node.width : 100,
                    height: node.height ? node.height : 100,
                })),
                edges: getEdges().map((edge: Edge): ElkExtendedEdge => ({
                    id: edge.id,
                    sources: [edge.source],
                    targets: [edge.target]
                })),
            };

            const nodes: Node[] = [];

            elk.layout(graph).then((root: ElkNode): void => {
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

                setNodes(nodes);
                window.requestAnimationFrame(() => {
                    fitView();
                });
            });
        },
        // todo why is eslint complaining about the following empty array?
        []
    );
};
