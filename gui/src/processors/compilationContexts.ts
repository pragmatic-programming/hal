import { CompilationContext, createCompilationContextFromProcessors } from "@pragmatic-programming/kico";
import { IHGraph } from "@pragmatic-programming/ihgraph";
import { FlowToIHGraphProcessor } from "./FlowToIHGraphProcessor";
import { IHGraphToFlowProcessor } from "./IHGraphToFlowProcessor";
import { StateFlow } from "../state/flow/StateFlow";
import { HALGraphProcessor } from "./directors/HALGraphProcessor";


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
