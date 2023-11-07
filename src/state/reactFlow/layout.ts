import { State } from "../State";
import { FitViewOptions, Node } from "reactflow";
import { LayoutOptions } from "elkjs/lib/elk-api";
import { layoutedNodes } from "../layoutedNodes";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";

export function layout(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (getNode: (id: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions: LayoutOptions = {}) => {
        setState({
            ui: {
                ...getState().ui,
                busy: true,
            }
        });
        setState({
            reactFlow: {
                ...getState().reactFlow,
                nodes: await layoutedNodes(getState, getNode, layoutOptions),
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
