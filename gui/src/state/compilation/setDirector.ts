import { StoreApi } from "zustand";
import { State } from "../State";
import { DirectorProcessor } from "../../processors/directors/DirectorProcessor";


export function setDirector(setState: StoreApi<State>["setState"], getState: () => State) {
    return (director: typeof DirectorProcessor): void => {
        setState({
            compilation: {
                ...getState().compilation,
                director: director,
            },
            ui: {
                ...getState().ui,
                compilations: {
                    ...getState().ui.compilations,
                    open: false,
                }
            },
        });
    };
}
