import { LanguageIndicator } from "./LanguageIndicator";
import { SimpleNodeStatus } from "ihgraph";

export type NodeData =
    NodeDataCreate
    | NodeDataEditor
    | NodeDataFile
    | NodeDataImage

export interface NodeDataCreate {
    type: "create",
}

export interface NodeDataEditor {
    type: "editor",
    content: string | undefined,
    label: string,
    language: LanguageIndicator,
    status: SimpleNodeStatus,
    height: number,
    width: number,
}

export interface NodeDataFile {
    type: "file",
    fileType: "text/plain" | undefined
    content: string | undefined,
    height: number,
    width: number,
}

export interface NodeDataImage {
    type: "image",
    content: string | undefined,
    status: SimpleNodeStatus,
    height: number,
    width: number,
}

