import { SourceNode } from "ihgraph";

export function createNode(sourceNode: SourceNode) {
    return {
        id: sourceNode.getId(),
        type: "editorNode",
        data: {value: sourceNode.getContent()},
        // will be changed by automatic layout
        position: {x: 0, y: 0},
    };
}
