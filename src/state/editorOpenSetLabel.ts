import { State } from "./State";

export function editorOpenSetLabel(setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void) {
    return (label: string) => setState((state: State): State => {
        if (!state.editorOpen) {
            throw new Error("EditorOpen is undefined");
        }

        return {
            ...state,
            editorOpen: {
                ...state.editorOpen,
                label: label,
            }
        };
    });
}
