import { State } from "../State";
import { StoreApi } from "zustand";

export function toggleHierarchyMode(setState: StoreApi<State>["setState"], getState: () => State) {
    return () => { 
        setState((state: State): State => ({
            ...state,
            flow: {
                ...state.flow,
                hierarchyMode: !state.flow.hierarchyMode
            }
        }));
        getState().flow.reRender();
    };
}
