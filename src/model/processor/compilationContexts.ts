import { CompilationContext, createCompilationContextFromProcessors } from "kico";
import { ProjectToFlowProcessor } from "./ProjectToFlowProcessor";
import { Project } from "../Project";
import { ProjectToIHGraphProcessor } from "./ProjectToIHGraphProcessor";
import { HALGraphProcessor } from "hal-kico";
import { IHGraph } from "ihgraph";
import { IHGraphToProjectProcessor } from "./IHGraphToProjectProcessor";
import { FlowState } from "../../State";
import { FlowToIHGraphProcessor } from "./FlowToIHGraphProcessor";
import { IHGraphToFlowProcessor } from "./IHGraphToFlowProcessor";

export function projectToFlow(project: Project): CompilationContext {
    return createCompilationContextFromProcessors(
        project,
        ProjectToFlowProcessor,
    );
}

export function projectToIhGraph(project: Project): CompilationContext {
    return createCompilationContextFromProcessors(
        project,
        ProjectToIHGraphProcessor,
    );
}

export function ihGraphToHalGraph(ihgraph: IHGraph): CompilationContext {
    return createCompilationContextFromProcessors(
        ihgraph,
        HALGraphProcessor,
    );
}

export function ihGraphToProject(ihGraph: IHGraph): CompilationContext {
    return createCompilationContextFromProcessors(
        ihGraph,
        IHGraphToProjectProcessor
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
