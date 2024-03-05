import { LanguageIndicator } from "./LanguageIndicator";
import { SimpleNodeStatus } from "@pragmatic-programming/ihgraph";

export type NodeData =
    NodeDataCreate
    | NodeDataEditor
    | NodeDataFile
    | NodeDataImage

export interface NodeDataCreate {
    type: "create",
    x: number,
    y: number,
}

export interface NodeDataEditor {
    type: "editor",
    content: string | undefined,
    label: string,
    language: LanguageIndicator,
    status: SimpleNodeStatus,
    x: number,
    y: number,
    height: number,
    width: number,
}

export interface NodeDataFile {
    type: "file",
    fileType: "text/plain" | undefined
    content: string | undefined,
    x: number,
    y: number,
    height: number,
    width: number,
}

export interface NodeDataImage {
    type: "image",
    content: string | undefined,
    status: SimpleNodeStatus,
    x: number,
    y: number,
    height: number,
    width: number,
}

