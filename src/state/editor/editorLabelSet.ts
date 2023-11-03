import { State } from "../State";
import { StoreApi } from "zustand";

export function editorLabelSet(setState: StoreApi<State>["setState"]) {
    return (label: string) => setState((state: State): State => {
        if (!state.editor.open) {
            throw new Error("EditorOpen.editor is undefined");
        }
        return {
            ...state,
            editor: {
                ...state.editor,
                open: {
                    ...state.editor.open,
                    label: label,
                }
            }
        };
    });
}
