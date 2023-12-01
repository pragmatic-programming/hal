import { CompilationContext, createCompilationContextFromProcessors } from "kico";
import { HALGraphProcessor } from "hal-kico";
import { IHGraph } from "ihgraph";
import { FlowToIHGraphProcessor } from "./FlowToIHGraphProcessor";
import { IHGraphToFlowProcessor } from "./IHGraphToFlowProcessor";
import { StateFlow } from "../state/flow/StateFlow";


export function ihGraphToHalGraph(ihgraph: IHGraph): CompilationContext {
    return createCompilationContextFromProcessors(
        ihgraph,
        HALGraphProcessor,
    );
}


export function flowToIHGraph(stateFlow: StateFlow): CompilationContext {
    return createCompilationContextFromProcessors(
        stateFlow,
        FlowToIHGraphProcessor
    );
}

export function iHGraphToFlow(ihGraph: IHGraph): CompilationContext {
    return createCompilationContextFromProcessors(
        ihGraph,
        IHGraphToFlowProcessor
    );
}
