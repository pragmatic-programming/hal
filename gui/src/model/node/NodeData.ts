import { LanguageIndicator } from "./LanguageIndicator";
import { XYPosition } from "reactflow";
import { SimpleNodeStatus } from "@pragmatic-programming/ihgraph";

export type NodeData =
    NodeDataCreate
    | NodeDataEditor
    | NodeDataFile
    | NodeDataImage
    | NodeDataHierarchy

interface NodeCommon {
    // if position is undefined, the render function will automatically lay out the whole graph
    position: XYPosition | undefined;
}

export interface NodeDataCreate extends NodeCommon {
    type: "create",
}

export interface NodeDataEditor extends NodeCommon {
    type: "editor",
    content: string | undefined,
    label: string,
    language: LanguageIndicator,
    status: SimpleNodeStatus,
    height: number,
    width: number,
}

export interface NodeDataFile extends NodeCommon {
    type: "file",
    fileType: "text/plain" | undefined
    content: string | undefined,
    height: number,
    width: number,
}

export interface NodeDataImage extends NodeCommon {
    type: "image",
    content: string | undefined,
    status: SimpleNodeStatus,
    height: number,
    width: number,
}

export interface NodeDataHierarchy extends NodeCommon {
    type: "hierarchy",
    height: number,
    width: number,
}
