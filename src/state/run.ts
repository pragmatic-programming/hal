import { State } from "./State";
import { CompilationContext } from "kico";
import { flowToIHGraph, ihGraphToHalGraph } from "../model/processor/compilationContexts";
import { CliqueSelectionProcessor } from "hal-kico";
import { FlowState } from "./FlowState";


export function run(setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void) {
    return async () => setState((state: State): State => {
        setState({
            busy: true
        });
        const preContext: CompilationContext = flowToIHGraph(new FlowState(state.nodes, state.edges));
        preContext.compile();
        const context: CompilationContext = ihGraphToHalGraph(preContext.getResult());
        context.startEnvironment.setProperty(CliqueSelectionProcessor.CSP_LOG, false);
        context.compile();
        return {
            ...state,
            context: context,
            busy: false,
        };
    });
}
