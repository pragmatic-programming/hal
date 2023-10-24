import { State } from "./State";

export function switchMode(setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void) {
    return () => setState((state: State): State => ({
        ...state,
        mode: state.mode === "dark" ? "light" : "dark"
    }));
}
