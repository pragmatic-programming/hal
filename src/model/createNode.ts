import { SourceNode, TransformationEdge } from "ihgraph";
import { Node } from "reactflow";
import NodeData from "./NodeData";

export function createNodeFromSourceNode(sourceNode: SourceNode): Node<NodeData> {
    const executeEdge = sourceNode
        .getIncomingEdges()
        .find((edge: TransformationEdge) => edge.getType().getId() === "execute");
    return createNode(
        sourceNode.getId(),
        executeEdge ? "resultNode" : "editorNode",
        sourceNode.getContent(),
        // todo get label from sourceNode
        "Missing",
        // todo get position from sourceNode
        0,
        0
    );
}

export function createCreationNode(
    id: string,
    x: number,
    y: number,
): Node<NodeData> {
    return {
        id: id,
        type: "creationNode",
        data: {
            content: "",
            label: "",
        },
        position: {x: x, y: y},
    };
}

export function createNode(
    id: string,
    type: string,
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
