import { NodeData, NodeDataEditor, NodeDataImage } from "./NodeData";
import { LanguageIndicator } from "./LanguageIndicator";
import { NodeDataTypeIdentifier } from "./NodeDataTypeIdentifier";
import { SourceNodeStatus } from "ihgraph";
import { DimensionsForContent } from "../../processor/edgeTypes/DimensionsForContent";

export class NodeDataFactory {

    static nodeDataEditor(
        content: string,
        label: string,
        language: LanguageIndicator,
        status: SourceNodeStatus,
    ): NodeDataEditor {
        const dimensionsForContent: DimensionsForContent = new DimensionsForContent(content);
        return {
            ...dimensionsForContent.dimension(),
            content: content,
            label: label,
            language: language,
            status: status,
            type: "editor",
        };
    }

    static nodeDataImage(
        content: string,
        height: number,
        width: number,
        status: SourceNodeStatus,
    ): NodeDataImage {
        return {
            content: content,
            height: height,
            status: status,
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
                    SourceNodeStatus.UNDEFINED,
                );
            case "image":
                return NodeDataFactory.nodeDataImage(
                    "",
                    64,
                    64,
                    SourceNodeStatus.UNDEFINED,
                );
        }
    }
}

