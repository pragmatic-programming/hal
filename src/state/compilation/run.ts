import { State } from "../State";
import { CompilationContext } from "kico";
import { flowToIHGraph, ihGraphToHalGraph } from "../../model/processor/compilationContexts";
import { CliqueSelectionProcessor } from "hal-kico";
import { StoreApi } from "zustand";
import { IHGraph } from "../../../../ihgraph";


export function run(setState: StoreApi<State>["setState"]) {
    return async () => setState((state: State): State => {
        setState({
            ui: {
                ...state.ui,
                busy: true,
            }
        });
        const preContext: CompilationContext = flowToIHGraph(state.reactFlow);
        preContext.compile();
        const result: IHGraph = preContext.getResult();
        console.log(result.serialize(true))
        const context: CompilationContext = ihGraphToHalGraph(result);
        context.startEnvironment.setProperty(CliqueSelectionProcessor.CSP_LOG, false);
        context.compile();
        return {
            ...state,
            compilation: {
                ...state.compilation,
                context: context,
            },
            ui: {
                ...state.ui,
                busy: false,
            }
        };
    });
}
