import { State } from "../State";
import { CompilationContext, Processor, createCompilationContextFromProcessors } from "kico";
import { flowToIHGraph } from "../../model/processor/compilationContexts";
import { CliqueSelectionProcessor } from "hal-kico";
import { StoreApi, useStore } from "zustand";
import { IHGraph } from "ihgraph";
import { useReactFlow } from "reactflow";


export function runImmediate(setState: StoreApi<State>["setState"], getState: () => State) {
    return async () => {
        const state = getState();

        const preContext: CompilationContext = flowToIHGraph(state.reactFlow);
        await preContext.compileAsync();

        const ihGraph = preContext.getResult() as IHGraph;
        const immediateCliques = ihGraph.getImmediateCliques();

        for(const clique of immediateCliques) {
            console.log(clique);
            const edgeType = clique.getEdges()[0].getType();
            const transformationConfiguration = clique.getTransformationConfiguration();
            const processorType = transformationConfiguration.get(edgeType);
            const immediateContext = createCompilationContextFromProcessors(clique,
                processorType as typeof Processor);
            console.log(processorType);
            await immediateContext.compileAsync();
            // ihGraph.replaceClique(clique, immediateContext.getResult());
        };
        // setState({
        //     ...state,
        //     compilation: {
        //         ...state.compilation,
        //         context: context,
        //     },
        //     ui: {
        //         ...state.ui,
        //         busy: false,
        //     }
        // });
    };
}
