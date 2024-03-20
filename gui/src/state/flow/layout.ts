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
        setState({
            flow: {
                ...reactFlow,
                layoutOption: layoutOption,
                ...await layoutedNodes(reactFlow, layoutOptions(layoutOption)),
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
