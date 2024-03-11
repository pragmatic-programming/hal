import { StoreApi } from "zustand";
import { State } from "../State";
import { DirectorProcessor } from "../../processors/directors/DirectorProcessor";


export function setDirector(setState: StoreApi<State>["setState"], getState: () => State) {
    return (director: typeof DirectorProcessor): void => {
        const state: State = getState();
        setState({
            compilation: {
                ...state.compilation,
                director: director,
            },
            ui: {
                ...state.ui,
                compilations: {
                    ...state.ui.compilations,
                    open: false,
                }
            },
        });
    };
}
