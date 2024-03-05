import { NodeDataCreate, NodeDataEditor, NodeDataFile, NodeDataImage } from "./NodeData";
import { LanguageIndicator } from "./LanguageIndicator";
import { SimpleNodeStatus } from "@pragmatic-programming/ihgraph";

export class NodeDataFactory {

    static nodeDataCreate(
        x: number,
        y: number,
    ): NodeDataCreate {
        return {
            type: "create",
            x: x,
            y: y,
        };
    }

    static nodeDataEditor(
        content: string | undefined,
        label: string,
        language: LanguageIndicator,
        status: SimpleNodeStatus,
        x: number,
        y: number,
        width: number,
        height: number,
    ): NodeDataEditor {
        return {
            content: content,
            label: label,
            language: language,
            status: status,
            type: "editor",
            x: x,
            y: y,
            width: width,
            height: height,
        };
    }

    static nodeDataImage(
        content: string | undefined,
        x: number,
        y: number,
        width: number,
        height: number,
        status: SimpleNodeStatus,
    ): NodeDataImage {
        return {
            type: "image",
            content: content,
            status: status,
            x: x,
            y: y,
            width: width,
            height: height,
        };
    }

    static nodeDataFile(
        content: string | undefined,
        fileType: "text/plain" | undefined,
        x: number,
        y: number,
        height: number,
        width: number,
    ): NodeDataFile {
        return {
            type: "file",
            content: content,
            fileType: fileType,
            x: x,
            y: y,
            width: width,
            height: height,
        };
    }
}

