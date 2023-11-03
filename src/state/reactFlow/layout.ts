import { State } from "../State";
import { FitViewOptions, Node } from "reactflow";
import { LayoutOptions } from "elkjs/lib/elk-api";
import { layoutedNodes } from "../manipulate/layoutedNodes";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";

export function layout(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (getNode: (id: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions: LayoutOptions = {}) => {
        setState({
            busy: true
        });
        setState({
            reactFlow: {
                ...getState().reactFlow,
                nodes: await layoutedNodes(getState, getNode, layoutOptions)
            }
        });
        window.requestAnimationFrame(() => {
            fitView(globalFitViewOptions);
        });
        setState({
            busy: false
        });
    };
}
