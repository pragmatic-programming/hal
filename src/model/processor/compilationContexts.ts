import { CompilationContext, createCompilationContextFromProcessors } from "kico";
import { HALGraphProcessor } from "hal-kico";
import { IHGraph } from "ihgraph";
import { FlowState } from "../../State";
import { FlowToIHGraphProcessor } from "./FlowToIHGraphProcessor";
import { IHGraphToFlowProcessor } from "./IHGraphToFlowProcessor";


export function ihGraphToHalGraph(ihgraph: IHGraph): CompilationContext {
    return createCompilationContextFromProcessors(
        ihgraph,
        HALGraphProcessor,
    );
}


export function flowToIHGraph(flowState: FlowState): CompilationContext {
    return createCompilationContextFromProcessors(
        flowState,
        FlowToIHGraphProcessor
    );
}

export function iHGraphToFlow(ihGraph: IHGraph): CompilationContext {
    return createCompilationContextFromProcessors(
        ihGraph,
        IHGraphToFlowProcessor
    );
}
