import { State } from "../State";
import { StoreApi } from "zustand";
import { ModeIndicator } from "./ModeIndicator";


function next(mode: ModeIndicator): ModeIndicator {
    switch (mode) {
        case "compact":
            return "text";
        case "text":
            return "verbose";
        case "verbose":
            return "compact";
    }
}

export function cycleMode(setState: StoreApi<State>["setState"], getState: () => State) {
    return (): void => {
        const state: State = getState();
        setState({
            ...state,
            flow: {
                ...state.flow,
                mode: next(state.flow.mode)
            }
        });
    };
}
