import { State } from "../State";
import { FitViewOptions } from "reactflow";
import { LayoutOptions } from "elkjs/lib/elk-api";
import { layoutedNodes } from "../layoutedNodes";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";

export function layout(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions: LayoutOptions = {}) => {
        setState({
            ui: {
                ...getState().ui,
                busy: true,
            }
        });
        const reactFlow = getState().reactFlow;
        setState({
            reactFlow: {
                ...reactFlow,
                nodes: await layoutedNodes(reactFlow, layoutOptions),
            }
        });
        window.requestAnimationFrame(() => {
            fitView(globalFitViewOptions);
        });
        setState({
            ui: {
                ...getState().ui,
                busy: false,
            }
        });
    };
}
