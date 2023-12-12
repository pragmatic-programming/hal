import { NodeDataCreate, NodeDataEditor, NodeDataFile, NodeDataImage } from "./NodeData";
import { LanguageIndicator } from "./LanguageIndicator";
import { SourceNodeStatus } from "ihgraph";

export class NodeDataFactory {

    static nodeDataCreate(): NodeDataCreate {
        return {
            type: "create",
        };
    }

    static nodeDataEditor(
        content: string,
        label: string,
        language: LanguageIndicator,
        status: SourceNodeStatus,
    ): NodeDataEditor {
        return {
            content: content,
            label: label,
            language: language,
            status: status,
            type: "editor",
            // todo remove
            height: 0,
            width: 0,

        };
    }

    static nodeDataImage(
        content: string,
        height: number,
        width: number,
        status: SourceNodeStatus,
    ): NodeDataImage {
        return {
            type: "image",
            content: content,
            status: status,
            width: width,
            height: height,
        };
    }

    static nodeDataFile(
        content: string | undefined,
        fileType: "text/plain" | undefined,
        height: number,
        width: number,
    ): NodeDataFile {
        return {
            type: "file",
            content: content,
            fileType: fileType,
            width: width,
            height: height,
        };
    }
}

