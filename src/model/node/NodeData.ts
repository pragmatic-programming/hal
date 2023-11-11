import { LanguageIndicator } from "./LanguageIndicator";
import { SourceNodeStatus } from "ihgraph";

export type NodeData = NodeDataEditor | NodeDataResult | NodeDataCreate | NodeDataImage

interface NodeDataCommon {
    width: number,
    height: number,
}

export interface NodeDataEditor extends NodeDataCommon {
    type: "editor",
    content: string | undefined,
    label: string,
    language: LanguageIndicator,
    status: SourceNodeStatus,
}

export interface NodeDataResult extends NodeDataCommon {
    type: "result",
}

export interface NodeDataCreate extends NodeDataCommon {
    type: "create",
}

export interface NodeDataImage extends NodeDataCommon {
    type: "image",
    content: string | undefined,
}
