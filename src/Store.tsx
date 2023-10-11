import { create } from "zustand";
import { State } from "./State";
import { Canvas } from "./model/Canvas";
import { Editor } from "./model/Editor";
import { Dimension } from "./model/Dimension";
import { Position } from "./model/Position";
import { Edge } from "./model/Edge";
import { EdgeStyle } from "./model/EdgeStyle";

const canvas = new Canvas(
        [
            new Editor(
                1,
                new Dimension(640, 480),
                new Position(5, 50),
                "javascript",
                "var x = 'World';",
                [
                    new Edge(
                        1,
                        2,
                        new Position(645, 100),
                        new Position(800, 100),
                        EdgeStyle.dotted
                    )
                ]
            ),
            new Editor(
                2,
                new Dimension(640, 480),
                new Position(800, 50),
                "javascript",
                "alert('Hello '+ x)"
            ),
        ],
    )
;

export const useStore = create<State>((setState) => ({
    menuWidth: 100,
    canvas: canvas,
    mode: "dark",
    highlightedEditorId: null,
    switchMode: () => setState((state: State): State => ({
        ...state, mode: state.mode === "dark" ? "light" : "dark"
    })),
    addEditor: () => setState((state: State): State => ({
        ...state,
        canvas: state.canvas.addEditor()
    })),
    removeEditor: () => setState((state: State): State => ({
        ...state,
        canvas: state.canvas.removeEditor(state.highlightedEditorId)
    })),
    selectEditor: (id: number | null) => setState((state: State): State => ({
        ...state, highlightedEditorId: id
    })),
    moveEditor: (id: number, delta: Position) => setState((state: State): State => ({
        ...state,
        canvas: state.canvas.moveEditor(id, delta)
    }))
}));
