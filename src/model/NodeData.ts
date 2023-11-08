import { Language } from "./Languages";

export type NodeData = NodeDataEditor | NodeDataResult | NodeDataCreation | NodeDataImage

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
    //todo content is redundant
    content: string | undefined,
    label: string,
    language: Language,
}

export interface NodeDataCreation extends NodeDataCommon {
    type: "creation",
}

export interface NodeDataImage extends NodeDataCommon {
    type: "image",
    //todo content is redundant
    content: string | undefined,
}
