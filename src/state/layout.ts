import { State } from "./State";
import { FitViewOptions, Node } from "reactflow";
import { LayoutOptions } from "elkjs/lib/elk-api";
import { layoutedNodes } from "./layoutedNodes";
import { globalFitViewOptions } from "../constants";

export function layout(setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void, getState: () => State) {
    return async (getNode: (id: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions: LayoutOptions) => {
        setState({
            busy: true
        });
        setState({
            nodes: await layoutedNodes(getState, getNode, layoutOptions)
        });
        window.requestAnimationFrame(() => {
            fitView(globalFitViewOptions);
        });
        setState({
            busy: false
        });
    };
}
