import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";

export interface StateCompilationImmediate {
    context: CompilationContext,
    render: (ihGraph: IHGraph, fitView: () => void) => void,
    runImmediate: () => void,
}
