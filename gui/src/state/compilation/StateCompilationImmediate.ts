import { CompilationContext } from "kico";

export interface StateCompilationImmediate {
    context: CompilationContext,
    runImmediate: () => void,
}
