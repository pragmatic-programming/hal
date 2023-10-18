import { Project } from "./model/Project";
import { PaletteMode } from "@mui/material";
import { Editor } from "./model/Editor";
import { Position } from "./model/Position";
import { CompilationContext, Processor } from "kico";

export interface State {
    locked: boolean;
    context: CompilationContext;
    project: Project;
    mode: PaletteMode;
    highlightedEditor: {
        first: number | null
        second: number | null
    };
    setProject: (processor: Processor<any, any>) => void;
    run: () => void;
    switchMode: () => void;
    switchLocked: () => void;
    removeEditor: () => void;
    selectEditor: (id: number | null) => void;
    addEditor: (editor: Editor) => void;
    moveEditor: (id: number, position: Position) => void;
    moveEdges: (editorId: number, position: Position) => void;
    addEdge: () => void;
    updateEditorValue: (id: number, value: string | undefined) => void;
}
