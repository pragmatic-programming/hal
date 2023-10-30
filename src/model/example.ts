import { Edge, Node } from "reactflow";
import { createExecuteEdge, createSequenceEdge } from "./createEdge";
import NodeData from "./NodeData";
import { createEditorNode, createResultNode } from "./createNode";


export const nodes: Node<NodeData>[] = [
    createEditorNode(
        "1",
        "var x = 1;",
        "Declaration",
        50,
        25,
    ),
    createEditorNode(
        "2",
        "x + 2;",
        "Usage",
        50,
        25,
    ),
    createResultNode(
        "3",
        "",
        "Result",
        700,
        25,
    )
];

export const edges: Edge[] = [
    createSequenceEdge("1", "2"),
    createExecuteEdge("2", "3")
];
