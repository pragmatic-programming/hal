import { create } from "zustand";
import { State } from "./State";
import { Canvas } from "./model/Canvas";
import { Editor } from "./model/Editor";
import { Dimension } from "./model/Dimension";
import { Position } from "./model/Position";
import { Edge } from "./model/Edge";
import { Editors } from "./model/Editors";
import { Edges } from "./model/Edges";

const map = new Map<number, Editor>();

let editor1 = new Editor(
    1,
    new Dimension(640, 480),
    new Position(50, 50),
    "javascript",
    "var x = 'World';",
);
let editor2 = new Editor(
    2,
    new Dimension(640, 480),
    new Position(800, 50),
    "javascript",
    "alert('Hello '+ x)"
);

map.set(editor1.id, editor1);
map.set(editor2.id, editor2);
const canvas = new Canvas(
        new Editors(map),
        new Edges([
            Edge.create(editor1, editor2)
        ])
    )
;

export const useStore = create<State>((setState) => ({
    menuWidth: 100,
    canvas: canvas,
    mode: "light",
    highlightedEditorId: null,
    switchMode: () => setState((state: State): State => ({
        ...state, mode: state.mode === "dark" ? "light" : "dark"
    })),
    addEditor: () => setState((state: State): State => ({
        ...state,
        canvas: state.canvas.addedEditor()
    })),
    removeEditor: () => setState((state: State): State => {
        if (state.highlightedEditorId === null) {
            throw Error("removeEditor() called with highlightedEditorId is null");
        }
        return {
            ...state,
            highlightedEditorId: null,
            canvas: state.canvas.removedEditor(state.highlightedEditorId)
        };
    }),
    selectEditor: (id: number | null) => setState((state: State): State => ({
        ...state, highlightedEditorId: id
    })),
    moveEditor: (id: number, delta: Position) => setState((state: State): State => ({
        ...state,
        canvas: state.canvas.movedEditor(id, delta)
    })),
    moveEdges: (editorId: number, delta: Position) => setState((state: State): State => ({
        ...state,
        canvas: state.canvas.movedEdges(editorId, delta)
    }))
}));
