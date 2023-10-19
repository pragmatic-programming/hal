import { Edge, Node } from "reactflow";


export const nodes: Node[] = [
    {
        id: "1",
        type: "editorNode",
        data: {value: "var x = 1;"},
        position: {x: 100, y: 25},
    },
    {
        id: "2",
        type: "editorNode",
        data: {value: "x + 2"},
        position: {x: 100, y: 425},
    },
];
export const edges: Edge[] = [
    {id: "e1-2", source: "1", target: "2"},
];
