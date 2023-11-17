import { State } from "../State";
import { StoreApi } from "zustand";

export function editorContentSet(setState: StoreApi<State>["setState"]) {
    return (content: string | undefined) => setState((state: State): State => {
        if (!state.editor.open) {
            throw new Error("EditorOpen.editor is undefined");
        }
        return {
            ...state,
            editor: {
                ...state.editor,
                open: {
                    ...state.editor.open,
                    content: content,
                }
            }
        };
    });
}
