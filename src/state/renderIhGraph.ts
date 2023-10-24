import { State } from "./State";
import { IHGraph } from "ihgraph";
import { FitViewOptions, Node } from "reactflow";
import { CompilationContext } from "kico";
import { iHGraphToFlow } from "../model/processor/compilationContexts";
import { layoutedNodes } from "./layoutedNodes";
import { globalFitViewOptions } from "../constants";

export function renderIhGraph(setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void, getState: () => State) {
    return async (ihGraph: IHGraph, getNode: (id: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void) => {
        setState({
            busy: true
        });
        const context: CompilationContext = iHGraphToFlow(ihGraph);
        context.compile();
        const flowState = context.getResult();
        setState({
            nodes: flowState.nodes,
            edges: flowState.edges,
        });
        setState({
            nodes: await layoutedNodes(getState, getNode)
        });
        window.requestAnimationFrame(() => {
            fitView(globalFitViewOptions);
        });
        setState({
            busy: false
        });
    };
}
