import { State } from "../State";
import { StoreApi } from "zustand";

export function switchMode(setState: StoreApi<State>["setState"]) {
    return () => setState((state: State): State => ({
        ...state,
        ui: {
            ...state.ui,
            mode: state.ui.mode === "dark" ? "light" : "dark"
        }
    }));
}
