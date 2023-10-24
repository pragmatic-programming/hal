import { SourceNode, TransformationEdge } from "ihgraph";
import { Node } from "reactflow";

export function createNode(sourceNode: SourceNode): Node {
    const executeEdge = sourceNode
        .getIncomingEdges()
        .find((edge: TransformationEdge) => edge.getType().getId() === "execute");
    return {
        id: sourceNode.getId(),
        type: executeEdge ? "resultNode" : "editorNode",
        data: {value: sourceNode.getContent()},
        // will be changed by automatic layout
        position: {x: 0, y: 0},
    };
}
