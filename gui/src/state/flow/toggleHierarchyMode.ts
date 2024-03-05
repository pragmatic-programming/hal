import { State } from "../State";
import { StoreApi } from "zustand";

export function toggleHierarchyMode(setState: StoreApi<State>["setState"]) {
    return () => setState((state: State): State => ({
        ...state,
        flow: {
            ...state.flow,
            hierarchyMode: !state.flow.hierarchyMode
        }
    }));
}
