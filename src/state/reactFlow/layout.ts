import { State } from "../State";
import { FitViewOptions } from "reactflow";
import { LayoutOptions } from "elkjs/lib/elk-api";
import { layoutedNodes } from "../layoutedNodes";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";
import { isLayoutDirectionIndicator } from "./LayoutDirectionIndicator";

export function layout(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions: LayoutOptions = {}) => {
        const layoutDirection = layoutOptions["elk.direction"];
        if (!isLayoutDirectionIndicator(layoutDirection)) {
            throw new Error("elk.direction is not a valid layout direction indicator");
        }
        const state = getState();
        setState({
            ui: {
                ...state.ui,
                busy: true,
            }
        });
        const reactFlow = state.reactFlow;
        setState({
            reactFlow: {
                ...reactFlow,
                layoutDirection: layoutDirection,
                nodes: await layoutedNodes(reactFlow, layoutOptions),
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
