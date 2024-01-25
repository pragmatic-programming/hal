import { CompilationContext } from "@pragmatic-programming/kico";

export interface StateCompilation {
    context: CompilationContext,
    run: () => void,
}
