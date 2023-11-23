import { State } from "../State";
import { CompilationContext, createCompilationContextFromProcessors, Processor } from "kico";
import { flowToIHGraph, iHGraphToFlow } from "../../processor/compilationContexts";
import { StoreApi } from "zustand";
import { EdgeType, IHGraph, TransformationConfiguration } from "ihgraph";
import { layoutedNodes } from "../layoutedNodes";
import { layoutOptions } from "../../util";
import { StateFlow } from "../flow/StateFlow";


export function runImmediate(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (): Promise<void> => {
        const oldState: State = getState();
        setState({
            ui: {
                ...oldState.ui,
                busy: true,
            }
        });

        const preContext: CompilationContext = flowToIHGraph(oldState.flow);
        await preContext.compileAsync();

        const ihGraph: IHGraph = preContext.getResult() as IHGraph;
        const immediateCliques: IHGraph[] = ihGraph.getImmediateCliques();

        for (const clique of immediateCliques) {
            const edgeType: EdgeType = clique.getEdges()[0].getType();
            const transformationConfiguration: TransformationConfiguration = clique.getTransformationConfiguration();
            const processorType = transformationConfiguration.get(edgeType);
            const immediateContext: CompilationContext = createCompilationContextFromProcessors(clique, processorType as typeof Processor);
            await immediateContext.compileAsync();

            ihGraph.replaceClique(clique, immediateContext.getResult());
        }

        const context: CompilationContext = iHGraphToFlow(ihGraph);
        await context.compileAsync();
        const flowState = context.getResult();
        const newState: State = getState();
        const reactFlow: StateFlow = {
            ...newState.flow,
            nodes: flowState.nodes,
            edges: flowState.edges,
        };
        setState({
            flow: {
                ...reactFlow,
                nodes: await layoutedNodes(flowState, layoutOptions(newState.flow.layoutOption)),
            },
            ui: {
                ...newState.ui,
                busy: false,
            }
        });
    };
}
