import { LanguageIndicator } from "./LanguageIndicator";
import { SourceNodeStatus } from "ihgraph";

export type NodeData = NodeDataEditor | NodeDataCreate | NodeDataImage


export interface NodeDataEditor {
    type: "editor",
    content: string | undefined,
    label: string,
    language: LanguageIndicator,
    status: SourceNodeStatus,
}

export interface NodeDataCreate {
    type: "create",
}

export interface NodeDataImage {
    type: "image",
    content: string | undefined,
    status: SourceNodeStatus,
    height: number,
    width: number,
}
