import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";

export interface StateCompilationImmediate {
    context: CompilationContext,
    runImmediate: () => void,
}
