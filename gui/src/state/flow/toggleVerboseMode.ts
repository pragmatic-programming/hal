import { State } from "../State";
import { StoreApi } from "zustand";

export function toggleVerboseMode(setState: StoreApi<State>["setState"], getState: () => State) {
    return () => {
        const state = getState();
        let verboseMode: "compact" | "middle" | "verbose" = "compact";
        if (state.flow.verboseMode === "compact") {
            verboseMode = "middle";
        }
        if (state.flow.verboseMode === "middle") {
            verboseMode = "verbose";
        }
        setState({
            ...state,
            flow: {
                ...state.flow,
                verboseMode: verboseMode
            }
        });
    };
}
