import { create } from "zustand";
import { State } from "./State";
import { Position } from "./model/Position";
import { KicoProcessor } from "./model/KicoProcessor";
import { example } from "./model/example";

export const useStore = create<State>((setState) => ({
    locked: true,
    menuWidth: 100,
    bottomHeight: 26,
    project: example,
    mode: "light",
    highlightedEditor: {
        first: null,
        second: null
    },
    run: () => setState((state: State): State => {
        const processor = new KicoProcessor();
        console.log(processor.getId());
        return {
            ...state,
        };
    }),
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
