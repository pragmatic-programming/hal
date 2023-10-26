import { SourceNode, TransformationEdge } from "ihgraph";
import { Node } from "reactflow";
import NodeData from "./NodeData";

export function createNode(sourceNode: SourceNode): Node<NodeData> {
    const executeEdge = sourceNode
        .getIncomingEdges()
        .find((edge: TransformationEdge) => edge.getType().getId() === "execute");
    return {
        id: sourceNode.getId(),
        type: executeEdge ? "resultNode" : "editorNode",
        // todo get label from sourceNode
        data: {content: sourceNode.getContent(), label: "Missing"},
        // will be changed by automatic layout
        position: {x: 0, y: 0},
    };
}
