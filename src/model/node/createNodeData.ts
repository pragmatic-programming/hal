import { NodeData, NodeDataCreate, NodeDataEditor, NodeDataImage } from "./NodeData";
import { LanguageIndicator } from "./LanguageIndicator";
import { NodeDataTypeIdentifier } from "./NodeDataTypeIdentifier";
import { SourceNodeStatus } from "ihgraph";

export function createNodeDataCreation(): NodeDataCreate {
    return {
        height: 0,
        type: "create",
        width: 0,
    };
}

export function createNodeDataEditor(
    content: string,
    label: string,
    language: LanguageIndicator,
    height: number,
    width: number,
    status: SourceNodeStatus,
): NodeDataEditor {
    return {
        content: content,
        height: height,
        label: label,
        language: language,
        status: status,
        type: "editor",
        width: width,
    };
}

export function createNodeDataImage(
    content: string,
    height: number,
    width: number
): NodeDataImage {
    return {
        content: content,
        height: height,
        type: "image",
        width: width,
    };
}

export function createNodeDataFromCreationNode(newNodeDataTypeIdentifier: NodeDataTypeIdentifier): NodeData {
    switch (newNodeDataTypeIdentifier) {
        case "create":
            throw new Error("Node is already a creation node");
        case "editor":
            return createNodeDataEditor(
                "",
                "New Editor Node",
                "JavaScript",
                300,
                400,
                SourceNodeStatus.UNDEFINED,
            );
        case "image":
            return createNodeDataImage(
                "",
                64,
                64,
            );
    }
}
