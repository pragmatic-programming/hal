import { State } from "../State";
import { IHGraph } from "ihgraph";
import { FitViewOptions, Node } from "reactflow";
import { CompilationContext } from "kico";
import { iHGraphToFlow } from "../../model/processor/compilationContexts";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";
import { layoutedNodes } from "../layoutedNodes";

export function render(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (ihGraph: IHGraph, getNode: (id: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void) => {
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
        context.compile();
        const flowState = context.getResult();
        setState({
            reactFlow: {
                ...getState().reactFlow,
                nodes: flowState.nodes,
                edges: flowState.edges,
            }
        });
        setState({
            reactFlow: {
                ...getState().reactFlow,
                nodes: await layoutedNodes(getState, getNode)
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
