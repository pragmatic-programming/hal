import { CompilationContext, createCompilationContextFromProcessors } from "kico";
import { HALGraphProcessor } from "hal-kico";
import { IHGraph } from "ihgraph";
import { FlowToIHGraphProcessor } from "./FlowToIHGraphProcessor";
import { IHGraphToFlowProcessor } from "./IHGraphToFlowProcessor";
import { ReactFlow } from "../../state/substates/ReactFlow";


export function ihGraphToHalGraph(ihgraph: IHGraph): CompilationContext {
    return createCompilationContextFromProcessors(
        ihgraph,
        HALGraphProcessor,
    );
}


export function flowToIHGraph(reactFlowState: ReactFlow): CompilationContext {
    return createCompilationContextFromProcessors(
        reactFlowState,
        FlowToIHGraphProcessor
    );
}

export function iHGraphToFlow(ihGraph: IHGraph): CompilationContext {
    return createCompilationContextFromProcessors(
        ihGraph,
        IHGraphToFlowProcessor
    );
}
