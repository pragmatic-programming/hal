import { create } from "zustand";
import { State } from "./State";
import { Position } from "./model/Position";
import { ProjectToIHGraphProcessor } from "./model/ProjectToIHGraphProcessor";
import { example } from "./model/example";
import { createCompilationContextFromProcessors } from "kico";
import { HALGraphProcessor } from "hal-kico";
import { EvalJSProcessor } from "./model/EvalJSProcessor";

export const useStore = create<State>((setState) => ({
    locked: true,
    menuWidth: 100,
    bottomHeight: 26,
    result: "",
    project: example,
    mode: "light",
    highlightedEditor: {
        first: null,
        second: null
    },
    run: () => setState((state: State): State => {
        const context = createCompilationContextFromProcessors(
            state.project,
            ProjectToIHGraphProcessor,
            HALGraphProcessor
        );
        context.compile();
        // todo context2 is a workaround
        const context2 = createCompilationContextFromProcessors(
            context.getResult(),
            EvalJSProcessor
        );
        context2.compile();
        return {
            ...state,
            result: context2.getResult()
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
