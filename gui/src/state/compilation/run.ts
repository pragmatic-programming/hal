import { State } from "../State";
import { CompilationContext, Processor, StatusEntry } from "kico";
import { flowToIHGraph, ihGraphToHalGraph } from "../../processor/compilationContexts";
import { StoreApi } from "zustand";
import { StateMessage } from "../ui/message/StateMessage";
import { CliqueSelectionProcessor } from "../../processor/CliqueSelectionProcessor";


export function run(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (): Promise<void> => {
        const state = getState();
        setState({
            ui: {
                ...state.ui,
                busy: true,
            }
        });
        const preContext: CompilationContext = flowToIHGraph(state.flow);
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
                message: stateMessage(state.ui.message, context)
            }
        });
    };
}

function stateMessage(state: StateMessage, context: CompilationContext): StateMessage {
    const failedProcessor: Processor<any, any> | undefined = context.processors.find((processor: Processor<any, any>) => processor.getStatus().hasErrors());
    if (failedProcessor === undefined) {
        return {
            ...state,
            severity: "success",
            content: "Compilation finished",
        };
    }
    const firstError: StatusEntry = failedProcessor.getStatus().getErrors()[0];
    return {
        ...state,
        severity: "error",
        content: firstError.message,
    };
}
