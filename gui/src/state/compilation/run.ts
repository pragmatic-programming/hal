import { State } from "../State";
import { CompilationContext } from "kico";
import { flowToIHGraph, ihGraphToHalGraph } from "../../processor/compilationContexts";
import { CliqueSelectionProcessor } from "hal-kico";
import { StoreApi } from "zustand";


export function run(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (): Promise<void> => {
        const state = getState();
        setState({
            ui: {
                ...state.ui,
                busy: true,
            }
        });
        const preContext: CompilationContext = flowToIHGraph(state.reactFlow);
        await preContext.compileAsync();
        const context: CompilationContext = ihGraphToHalGraph(preContext.getResult());
        context.startEnvironment.setProperty(CliqueSelectionProcessor.CSP_LOG, false);
        await context.compileAsync();
        setState({
            ...state,
            compilation: {
                ...state.compilation,
                context: context,
            },
            ui: {
                ...state.ui,
                busy: false,
            }
        });
    };
}
