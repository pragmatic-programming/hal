import { State } from "../State";
import { StoreApi } from "zustand";

export function menuExamplesOpenToggle(setState: StoreApi<State>["setState"]) {
    return () => setState((state: State): State => {
            return {
                ...state,
                menuExamples: {
                    ...state.menuExamples,
                    open: !state.menuExamples.open
                }
            };
        }
    );
}