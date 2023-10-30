import { SourceNode, TransformationEdge } from "ihgraph";
import { Node } from "reactflow";
import NodeData from "./NodeData";
import { nodeType } from "../ui/flow/flow/NodeTypes";

export function createNodeFromSourceNode(sourceNode: SourceNode): Node<NodeData> {
    const executeEdge = sourceNode
        .getIncomingEdges()
        .find((edge: TransformationEdge) => edge.getType().getId() === "execute");
    return node(
        sourceNode.getId(),
        executeEdge ? "result" : "editor",
        sourceNode.getContent(),
        // todo get label from sourceNode
        "Missing",
        // todo get position from sourceNode
        0,
        0
    );
}

export function createResultNode(
    id: string,
    content: string,
    label: string,
    x: number,
    y: number,
): Node<NodeData> {
    return node(
        id,
        "result",
        content,
        label,
        x,
        y,
    );
}

export function createEditorNode(
    id: string,
    content: string,
    label: string,
    x: number,
    y: number,
): Node<NodeData> {
    return node(
        id,
        "editor",
        content,
        label,
        x,
        y,
    );
}

export function createCreationNode(
    id: string,
    x: number,
    y: number,
): Node<NodeData> {
    return {
        id: id,
        type: "creation",
        data: {
            content: "",
            label: "",
        },
        position: {x: x, y: y},
    };
}

function node(
    id: string,
    type: nodeType,
    content: string,
    label: string,
    x: number,
    y: number,
): Node<NodeData> {
    return {
        id: id,
        type: type,
        data: {
            content: content,
            label: label
        },
        position: {x: x, y: y},
    };
}
