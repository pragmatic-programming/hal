import { State } from "../State";
import { FitViewOptions } from "reactflow";
import { LayoutOptions } from "elkjs/lib/elk-api";
import { layoutedNodes } from "../layoutedNodes";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";

export function layout(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions: LayoutOptions = {}) => {
        const state = getState();
        setState({
            ui: {
                ...state.ui,
                busy: true,
            },
        });
        const reactFlow = state.reactFlow;
        const newLayoutOptions: LayoutOptions = {
            ...getState().reactFlow.layoutOptions,
            ...layoutOptions
        };
        setState({
            reactFlow: {
                ...reactFlow,
                layoutOptions: layoutOptions,
                nodes: await layoutedNodes(reactFlow, newLayoutOptions),
            }
        });
        window.requestAnimationFrame(() => {
            fitView(globalFitViewOptions);
        });
        setState({
            ui: {
                ...state.ui,
                busy: false,
            },
            menuLayout: {
                ...state.menuLayout,
                open: false,
            }
        });
    };
}
