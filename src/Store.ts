import { create } from "zustand";
import { State } from "./State";
import { Position } from "./model/Position";
import { ProjectToIHGraphProcessor } from "./model/ProjectToIHGraphProcessor";
import { example } from "./model/example";
import { CompilationContext, createCompilationContextFromProcessors, Processor, System } from "kico";
import { HALGraphProcessor } from "hal-kico";

export const useStore = create<State>((setState) => ({
    locked: true,
    result: "",
    project: example,
    mode: "light",
    context: new CompilationContext(new System("empty", [])),
    highlightedEditor: {
        first: null,
        second: null
    },
    run: () => setState((state: State): State => {
        const context = createCompilationContextFromProcessors(
            state.project,
            ProjectToIHGraphProcessor,
        );
        context.compile();
        const context2 = createCompilationContextFromProcessors(
            context.getResult(),
            HALGraphProcessor
        );
        context2.compile();
        return {
            ...state,
            context: context2
        };
    }),
    setProject: (processor: Processor<any, any>) => setState((state: State): State => {
        console.log("foo")
        return {
            ...state
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
