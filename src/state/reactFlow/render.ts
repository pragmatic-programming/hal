import { State } from "../State";
import { IHGraph } from "ihgraph";
import { FitViewOptions } from "reactflow";
import { CompilationContext } from "kico";
import { iHGraphToFlow } from "../../model/processor/compilationContexts";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";
import { layoutedNodes } from "../layoutedNodes";

export function render(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (ihGraph: IHGraph, fitView: (fitViewOptions: FitViewOptions) => void) => {
        setState({
            ui: {
                ...getState().ui,
                busy: true,
            },
            menuExamples: {
                ...getState().menuExamples,
                open: false,
            }
        });
        const context: CompilationContext = iHGraphToFlow(ihGraph);
        await context.compileAsync();
        const flowState = context.getResult();
        const reactFlow = {
            ...getState().reactFlow,
            nodes: flowState.nodes,
            edges: flowState.edges,
        };
        setState({
            reactFlow: {
                ...reactFlow,
                layoutDirection: "RIGHT",
                nodes: await layoutedNodes(reactFlow)
            }
        });
        window.requestAnimationFrame(() => {
            fitView(globalFitViewOptions);
        });
        setState({
            ui: {
                ...getState().ui,
                busy: false,
            },
        });
    };
}
