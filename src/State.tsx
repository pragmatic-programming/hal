import { Canvas } from "./model/Canvas";
import { PaletteMode } from "@mui/material";
import { Editor } from "./model/Editor";

export interface State {
    menuWidth: number;
    canvas: Canvas;
    mode: PaletteMode;
    highlightedEditorId: number | null;
    switchMode: () => void;
    removeEditor: () => void;
    selectEditor: (id: number | null) => void;
    addEditor: (editor: Editor) => void;
}
