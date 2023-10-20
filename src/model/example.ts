import { Edge, MarkerType, Node } from "reactflow";


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
];

export const markerEnd = {
    type: MarkerType.ArrowClosed,
    width: 30,
    height: 30,
};
export const edges: Edge[] = [
    {
        id: "e1-2",
        source: "1",
        target: "2",
        // todo add label to ihgraph
        label: "sequence",
        type: "smoothstep",
        markerEnd: markerEnd
    },
];
