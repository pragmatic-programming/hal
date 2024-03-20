import { State } from "../State";
import { StoreApi } from "zustand";
import { FitViewOptions } from "reactflow";
import { IHGraph } from "@pragmatic-programming/ihgraph";

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
        // if lastRenderGraph is null, if render() was never called
        // in this case we just exit the function and do nothing
        const lastRenderGraph: IHGraph | null = state.flow.lastRenderGraph;
        if (lastRenderGraph === null) {
            return;
        }
        state.flow.render(
            lastRenderGraph,
            fitView,
            state.ui.projectName
        );
    };
}
