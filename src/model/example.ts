import { Edge, Node } from "reactflow";
import { createExecuteEdge, createSequenceEdge } from "./createEdge";
import NodeData from "./NodeData";


export const nodes: Node<NodeData>[] = [
    {
        id: "1",
        type: "editorNode",
        data: {content: "var x = 1;", label: "Declaration"},
        position: {x: 50, y: 25},
    },
    {
        id: "2",
        type: "editorNode",
        data: {content: "x + 2", label: "Usage"},
        position: {x: 400, y: 25},
    },
    {
        id: "3",
        type: "resultNode",
        data: {content: "", label: "Result"},
        position: {x: 700, y: 25},
    },
];

export const edges: Edge[] = [
    createSequenceEdge("1", "2"),
    createExecuteEdge("2", "3")
];
