import { Language } from "./Languages";

export type NodeData = NodeDataEditor | NodeDataResult | NodeDataCreation | NodeDataImage
export type NodeDataTypeIdentifier = "editor" | "result" | "creation" | "image"

interface NodeDataCommon {
    width: number,
    height: number,
}

export interface NodeDataEditor extends NodeDataCommon {
    type: "editor",
    //todo content is redundant
    content: string | undefined,
    label: string,
    language: Language,
}

export interface NodeDataResult extends NodeDataCommon {
    type: "result",
}

export interface NodeDataCreation extends NodeDataCommon {
    type: "creation",
}

export interface NodeDataImage extends NodeDataCommon {
    type: "image",
    //todo content is redundant
    content: string | undefined,
}
