import { State } from "../State";
import { IHGraph } from "@pragmatic-programming/ihgraph";
import { FitViewOptions } from "reactflow";
import { CompilationContext } from "@pragmatic-programming/kico";
import { iHGraphToFlow } from "../../processor/compilationContexts";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";
import { NodesAndEdges } from "../../model/NodesAndEdges";

export function render(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (ihGraph: IHGraph, fitView: (fitViewOptions: FitViewOptions) => void, projectName?: string): Promise<void> => {
        setState({
            ui: {
                ...getState().ui,
                projectName: projectName ? projectName : getState().ui.projectName,
                busy: true,
                examples: {
                    ...getState().ui.examples,
                    open: false,
                }
            },
        });
        const context: CompilationContext = iHGraphToFlow(ihGraph);
        await context.compileAsync();
        const nodesAndEdges: NodesAndEdges = context.getResult();
        setState({
            flow: {
                ...getState().flow,
                ...nodesAndEdges,
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
