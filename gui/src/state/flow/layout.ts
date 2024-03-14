import { State } from "../State";
import { FitViewOptions } from "reactflow";
import { layoutedNodes } from "../layoutedNodes";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";
import { layoutOptions, LayoutOptionTypeIndicator } from "../../util";

export function layout(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (
        fitView: (fitViewOptions: FitViewOptions) => void,
        layoutOption: LayoutOptionTypeIndicator
    ): Promise<void> => {
        const state: State = getState();
        // show that ui is busy
        setState({
            ui: {
                ...state.ui,
                busy: true,
            },
        });
        // set compiled graph
        setState({
            flow: {
                ...state.flow,
                layoutOption: layoutOption,
                ...await layoutedNodes(state.flow, layoutOptions(layoutOption))
            }
        });
        // fit view
        window.requestAnimationFrame(() => {
            fitView(globalFitViewOptions);
        });
        // show that ui is not busy anymore
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
