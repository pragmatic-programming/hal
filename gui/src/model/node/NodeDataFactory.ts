import { NodeDataCreate, NodeDataEditor, NodeDataFile, NodeDataHierarchy, NodeDataImage } from "./NodeData";
import { LanguageIndicator } from "./LanguageIndicator";
import { SimpleNodeStatus } from "@pragmatic-programming/ihgraph";
import { XYPosition } from "reactflow";

export class NodeDataFactory {

    static nodeDataCreate(
        position: XYPosition | undefined
    ): NodeDataCreate {
        return {
            type: "create",
            position: position,
        };
    }

    static nodeDataEditor(
        content: string | undefined,
        label: string,
        language: LanguageIndicator,
        status: SimpleNodeStatus,
        position: XYPosition | undefined,
        width: number,
        height: number,
    ): NodeDataEditor {
        return {
            content: content,
            label: label,
            language: language,
            status: status,
            type: "editor",
            position: position,
            width: width,
            height: height,
        };
    }

    static nodeDataImage(
        content: string | undefined,
        position: XYPosition | undefined,
        width: number,
        height: number,
        status: SimpleNodeStatus,
    ): NodeDataImage {
        return {
            type: "image",
            content: content,
            status: status,
            position: position,
            width: width,
            height: height,
        };
    }

    static nodeDataFile(
        content: string | undefined,
        fileType: "text/plain" | undefined,
        position: XYPosition | undefined,
        height: number,
        width: number,
    ): NodeDataFile {
        return {
            type: "file",
            content: content,
            fileType: fileType,
            position: position,
            width: width,
            height: height,
        };
    }

    static nodeDataHierarchy(
        position: XYPosition | undefined,
        height: number,
        width: number,
    ): NodeDataHierarchy {
        return {
            type: "hierarchy",
            position: position,
            width: width,
            height: height,
        };
    }
}

