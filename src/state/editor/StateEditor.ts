import { Node } from "reactflow";

export interface StateEditorOpen {
    nodeId: string,
    content: string | undefined,
    label: string,
}

export interface StateEditor {
    open: StateEditorOpen | undefined;
    editorContentSet: (content: string | undefined) => void,
    editorLabelSet: (content: string) => void,
    editorOpen: (getNode: (nodeId: string) => Node | undefined, editorId: string | undefined) => void,
}
