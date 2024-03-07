import { State } from "../State";
import { IHGraph } from "@pragmatic-programming/ihgraph";
import { FitViewOptions } from "reactflow";
import { CompilationContext } from "@pragmatic-programming/kico";
import { iHGraphToFlow } from "../../processors/compilationContexts";
import { globalFitViewOptions } from "../../constants";
import { StoreApi } from "zustand";
import { layoutedNodes } from "../layoutedNodes";
import { layoutOptions } from "../../util";
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
        const reactFlow = {
            ...getState().flow,
            ...nodesAndEdges,
        };
        setState({
            flow: {
                ...reactFlow,
                nodes: await layoutedNodes(reactFlow, layoutOptions(getState().flow.layoutOption))
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
