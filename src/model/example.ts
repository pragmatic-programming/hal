import { Edge, Node } from "reactflow";
import { createExecuteEdge, createSequenceEdge } from "./createEdge";


export const nodes: Node[] = [
    {
        id: "1",
        type: "editorNode",
        data: {value: "var x = 1;"},
        position: {x: 50, y: 25},
    },
    {
        id: "2",
        type: "editorNode",
        data: {value: "x + 2"},
        position: {x: 400, y: 25},
    },
    {
        id: "3",
        type: "resultNode",
        data: {value: ""},
        position: {x: 700, y: 25},
    },
];

export const edges: Edge[] = [
    createSequenceEdge("1", "2"),
    createExecuteEdge("2", "3")
];
