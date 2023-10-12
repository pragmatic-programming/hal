import { create } from "zustand";
import { State } from "./State";
import { Project } from "./model/Project";
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
const canvas = new Project(
        "hello-world.hal",
        new Editors(map),
        new Edges([
            Edge.create(editor1, editor2)
        ])
    )
;

export const useStore = create<State>((setState) => ({
    locked: true,
    menuWidth: 100,
    bottomHeight: 26,
    project: canvas,
    mode: "light",
    highlightedEditor: {
        first: null,
        second: null
    },
    switchLocked: () => setState((state: State): State => ({
        ...state,
        locked: !state.locked
    })),
    switchMode: () => setState((state: State): State => ({
        ...state,
        mode: state.mode === "dark" ? "light" : "dark"
    })),
    addEditor: () => setState((state: State): State => ({
        ...state,
        project: state.project.addedEditor()
    })),
    removeEditor: () => setState((state: State): State => {
        if (state.highlightedEditor.first === null) {
            throw Error("removeEditor() called with highlightedEditor.first is null");
        }
        return {
            ...state,
            highlightedEditor: {
                ...state.highlightedEditor,
                first: null
            },
            project: state.project.removedEditor(state.highlightedEditor.first)
        };
    }),
    selectEditor: (id: number | null) => setState((state: State): State => {
        if (state.highlightedEditor.first === null) {
            return {
                ...state,
                highlightedEditor: {
                    ...state.highlightedEditor,
                    first: id,
                },
            };
        }
        if (state.highlightedEditor.first === id) {
            return {
                ...state,
                highlightedEditor: {
                    ...state.highlightedEditor,
                    first: null,
                },
            };
        }
        if (state.highlightedEditor.second === id) {
            return {
                ...state,
                highlightedEditor: {
                    ...state.highlightedEditor,
                    second: null
                },
            };
        }
        return {
            ...state,
            highlightedEditor: {
                ...state.highlightedEditor,
                second: id
            },
        };
    }),
    moveEditor: (id: number, delta: Position) => setState((state: State): State => ({
        ...state,
        project: state.project.movedEditor(id, delta)
    })),
    moveEdges: (editorId: number, delta: Position) => setState((state: State): State => ({
        ...state,
        project: state.project.movedEdges(editorId, delta)
    })),
    addEdge: () => setState((state: State): State => {
        if (state.highlightedEditor.first === null) {
            throw Error("addedEdge() called with highlightedEditor.first is null");
        }
        if (state.highlightedEditor.second === null) {
            throw Error("addedEdge() called with highlightedEditor.second is null");
        }
        return {
            ...state,
            project: state.project.addedEdge(state.highlightedEditor.first, state.highlightedEditor.second)
        };
    }),
    updateEditorValue: (id: number, value: string | undefined) => setState((state: State): State => ({
        ...state,
        project: state.project.updateEditorValue(id, value)
    })),
}));
