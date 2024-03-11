import { State } from "../State";
import { StoreApi } from "zustand";
import { reRender } from "../reRender";

export function toggleHierarchyMode(setState: StoreApi<State>["setState"], getState: () => State) {
    return (): void => {
        const state: State = getState();
        setState({
            ...state,
            flow: {
                ...state.flow,
                hierarchyMode: !state.flow.hierarchyMode
            }
        });
        reRender(state);
    };
}
