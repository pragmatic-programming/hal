import { State } from "../State";
import { StoreApi } from "zustand";

export function switchMode(setState: StoreApi<State>["setState"]) {
    return () => setState((state: State): State => ({
        ...state,
        mode: state.mode === "dark" ? "light" : "dark"
    }));
}
