import { NodeDataCreate, NodeDataEditor, NodeDataFile, NodeDataHierarchy, NodeDataImage } from "./NodeData";
import { LanguageIndicator } from "./LanguageIndicator";
import { SimpleNodeStatus } from "@pragmatic-programming/ihgraph";

export class NodeDataFactory {

    static nodeDataCreate(): NodeDataCreate {
        return {
            type: "create",
        };
    }

    static nodeDataEditor(
        content: string | undefined,
        label: string,
        language: LanguageIndicator,
        status: SimpleNodeStatus,
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
        content: string | undefined,
        height: number,
        width: number,
        status: SimpleNodeStatus,
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

    static nodeDataHierarchy(
        height: number,
        width: number,
    ): NodeDataHierarchy {
        return {
            type: "hierarchy",
            width: width,
            height: height,
        };
    }
}

