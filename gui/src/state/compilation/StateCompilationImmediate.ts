import { CompilationContext } from "@pragmatic-programming/kico";

export interface StateCompilationImmediate {
    context: CompilationContext,
    runImmediate: () => void,
}
