import { State } from "../State";
import { StoreApi } from "zustand";

export function editorOpenSetContent(setState: StoreApi<State>["setState"]) {
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
