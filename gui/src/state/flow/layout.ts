import { State } from "../State";
import { FitViewOptions } from "reactflow";
import { layoutedNodes } from "../layoutedNodes";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";
import { layoutOptions, LayoutOptionTypeIndicator } from "../../util";

export function layout(setState: StoreApi<State>["setState"], getState: () => State) {
    
    return async (fitView: (fitViewOptions: FitViewOptions) => void, layoutOption: LayoutOptionTypeIndicator) => {
        const state = getState();
        setState({
            ui: {
                ...state.ui,
                busy: true,
            },
        });
        const reactFlow = state.flow;
        const nodesAndEdges = await layoutedNodes(reactFlow, layoutOptions(layoutOption));
        setState({
            flow: {
                ...reactFlow,
                layoutOption: layoutOption,
                nodes: nodesAndEdges.nodes,
                edges: nodesAndEdges.edges,
            }
        });
        window.requestAnimationFrame(() => {
            fitView(globalFitViewOptions);
        });
        setState({
            ui: {
                ...state.ui,
                busy: false,
                layouts: {
                    ...state.ui.layouts,
                    open: false,
                }
            },
        });
    };
}
