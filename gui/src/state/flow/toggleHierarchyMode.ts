import { State } from "../State";
import { StoreApi } from "zustand";
import { reRender } from "../reRender";
import { FitViewOptions } from "reactflow";

export function toggleHierarchyMode(setState: StoreApi<State>["setState"], getState: () => State) {
    return (
        fitView: (fitViewOptions: FitViewOptions) => void,
    ): void => {
        const state: State = getState();
        setState({
            ...state,
            flow: {
                ...state.flow,
                hierarchyMode: !state.flow.hierarchyMode
            }
        });
        reRender(state, fitView);
    };
}
