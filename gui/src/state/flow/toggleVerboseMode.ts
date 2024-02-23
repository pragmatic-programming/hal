import { State } from "../State";
import { StoreApi } from "zustand";

export function toggleVerboseMode(setState: StoreApi<State>["setState"]) {
    return () => setState((state: State): State => ({
        ...state,
        flow: {
            ...state.flow,
            verboseMode: !state.flow.verboseMode
        }
    }));
}
