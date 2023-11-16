import { NodeData, NodeDataEditor, NodeDataImage } from "./NodeData";
import { LanguageIndicator } from "./LanguageIndicator";
import { NodeDataTypeIdentifier } from "./NodeDataTypeIdentifier";
import { SourceNodeStatus } from "ihgraph";

export class NodeDataFactory {

    static nodeDataEditor(
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

    static nodeDataImage(
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

    static fromCreationNode(newNodeDataTypeIdentifier: NodeDataTypeIdentifier): NodeData {
        switch (newNodeDataTypeIdentifier) {
            case "create":
                throw new Error("Node is already a creation node");
            case "editor":
                return NodeDataFactory.nodeDataEditor(
                    "",
                    "New Editor Node",
                    "JavaScript",
                    300,
                    400,
                    SourceNodeStatus.UNDEFINED,
                );
            case "image":
                return NodeDataFactory.nodeDataImage(
                    "",
                    64,
                    64,
                );
        }
    }
}

