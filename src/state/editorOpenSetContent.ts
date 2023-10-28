import { State } from "./State";

export function editorOpenSetContent(setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void) {
    return (content: string | undefined) => setState((state: State): State => {
        if (!state.editorOpen) {
            throw new Error("EditorOpen is undefined");
        }
        return {
            ...state,
            editorOpen: {
                ...state.editorOpen,
                content: content,
            }
        };
    });
}
