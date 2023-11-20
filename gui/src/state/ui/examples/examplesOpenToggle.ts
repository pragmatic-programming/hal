import { State } from "../../State";
import { StoreApi } from "zustand";

export function examplesOpenToggle(setState: StoreApi<State>["setState"]) {
    return () => setState((state: State): State => {
            return {
                ...state,
                ui: {
                    ...state.ui,
                    examples: {
                        ...state.ui.examples,
                        open: !state.ui.examples.open
                    }
                }
            };
        }
    );
}
