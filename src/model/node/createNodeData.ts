import {
    NodeData,
    NodeDataCreation,
    NodeDataEditor,
    NodeDataImage,
    NodeDataResult
} from "./NodeData";
import { LanguageIndicator } from "./LanguageIndicator";
import { NodeDataTypeIdentifier } from "./NodeDataTypeIdentifier";

export function createNodeDataCreation(): NodeDataCreation {
    return {
        height: 0,
        type: "creation",
        width: 0,
    };
}

export function createNodeDataEditor(
    content: string,
    label: string,
    language: LanguageIndicator,
    height: number,
    width: number,
): NodeDataEditor {
    return {
        content: content,
        height: height,
        label: label,
        language: language,
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

export function createNodeDataResult(
    height: number,
    width: number
): NodeDataResult {
    return {
        height: height,
        type: "result",
        width: width,
    };
}

export function createNodeDataFromCreationNode(newNodeDataTypeIdentifier: NodeDataTypeIdentifier): NodeData {
    switch (newNodeDataTypeIdentifier) {
        case "creation":
            throw new Error("Node is already a creation node");
        case "editor":
            return createNodeDataEditor(
                "",
                "New Editor Node",
                "JavaScript",
                300,
                400,
            );
        case "image":
            return createNodeDataImage(
                "",
                64,
                64,
            );
        case "result":
            return createNodeDataResult(
                128,
                128,
            );
    }
}
