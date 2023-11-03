import { PaletteMode } from "@mui/material";
import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";
import { Node } from "reactflow";
import { NewDialogOpenState } from "./substates/NewDialogOpenState";
import { EditorOpenState } from "./substates/EditorOpenState";
import { ReactFlow } from "./substates/ReactFlow";

export interface State {
    busy: boolean,
    context: CompilationContext,
    reactFlow: ReactFlow
    editorOpen: EditorOpenState | undefined,
    mode: PaletteMode,
    newNodeDialogOpen: NewDialogOpenState | undefined,
    projectName: string,
    editorOpenSetContent: (content: string | undefined) => void,
    editorOpenSetLabel: (content: string) => void,
    openEditor: (getNode: (nodeId: string) => Node | undefined, editorId: string | undefined) => void,
    openNewNodeDialog: (nodeId: string | undefined) => void,
    renderIhGraph: (ihGraph: IHGraph, getNode: (nodeId: string) => Node | undefined, fitView: () => void) => void,
    run: () => void,
    switchMode: () => void,
}
