import { State } from "../State";
import { CompilationContext, createCompilationContextFromProcessors, Processor } from "kico";
import { flowToIHGraph, iHGraphToFlow } from "../../model/processor/compilationContexts";
import { StoreApi } from "zustand";
import { IHGraph } from "ihgraph";
import { layoutedNodes } from "../layoutedNodes";
import { layoutOptions } from "../../util";


export function runImmediate(setState: StoreApi<State>["setState"], getState: () => State) {
    return async () => {
        const state = getState();

        const preContext: CompilationContext = flowToIHGraph(state.reactFlow);
        await preContext.compileAsync();

        const ihGraph = preContext.getResult() as IHGraph;
        const immediateCliques = ihGraph.getImmediateCliques();

        for (const clique of immediateCliques) {
            const edgeType = clique.getEdges()[0].getType();
            const transformationConfiguration = clique.getTransformationConfiguration();
            const processorType = transformationConfiguration.get(edgeType);
            const immediateContext = createCompilationContextFromProcessors(clique, processorType as typeof Processor);
            await immediateContext.compileAsync();

            ihGraph.replaceClique(clique, immediateContext.getResult());
        }

        const context: CompilationContext = iHGraphToFlow(ihGraph);
        await context.compileAsync();
        const flowState = context.getResult();
        const reactFlow = {
            ...getState().reactFlow,
            nodes: flowState.nodes,
            edges: flowState.edges,
        };
        setState({
            reactFlow: {
                ...reactFlow,
                nodes: await layoutedNodes(flowState, layoutOptions(getState().reactFlow.layoutOption)),
            }
        });
    };
}
