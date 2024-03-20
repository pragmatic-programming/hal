import { State } from "../State";
import { CompilationContext, createCompilationContextFromProcessors, Processor } from "@pragmatic-programming/kico";
import { flowToIHGraph, iHGraphToFlow } from "../../processors/compilationContexts";
import { StoreApi } from "zustand";
import { EdgeType, IHGraph, TransformationConfiguration } from "@pragmatic-programming/ihgraph";
import { layoutedNodes } from "../layoutedNodes";
import { layoutOptions } from "../../util";
import { StateFlow } from "../flow/StateFlow";
import { NodesAndEdges } from "../../model/NodesAndEdges";

export function runImmediate(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (): Promise<void> => {
        const oldState: State = getState();
        setState({
            ui: {
                ...oldState.ui,
                busy: true,
            }
        });
        const hierarchyMode: boolean = getState().flow.hierarchyMode;

        const preContext: CompilationContext = flowToIHGraph(oldState.flow);
        await preContext.compileAsync();

        const ihGraph = hierarchyMode ? (preContext.getResult() as IHGraph).getFlattenedHierarchy() : preContext.getResult();
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
        const nodesAndEdges: NodesAndEdges = context.getResult();
        const newState: State = getState();
        const reactFlow: StateFlow = {
            ...newState.flow,
            ...nodesAndEdges,
        };
        setState({
            flow: {
                ...reactFlow,
                ...await layoutedNodes(nodesAndEdges, layoutOptions(newState.flow.layoutOption)),
            },
            ui: {
                ...newState.ui,
                busy: false,
            }
        });
    };
}
