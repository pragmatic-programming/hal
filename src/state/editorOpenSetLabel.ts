import { State } from "./State";
import { StoreApi } from "zustand";

export function editorOpenSetLabel(setState: StoreApi<State>['setState']) {
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
