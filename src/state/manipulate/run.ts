import { State } from "../State";
import { CompilationContext } from "kico";
import { flowToIHGraph, ihGraphToHalGraph } from "../../model/processor/compilationContexts";
import { CliqueSelectionProcessor } from "hal-kico";
import { StoreApi } from "zustand";


export function run(setState: StoreApi<State>["setState"]) {
    return async () => setState((state: State): State => {
        setState({
            busy: true
        });
        const preContext: CompilationContext = flowToIHGraph(state.reactFlow);
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
