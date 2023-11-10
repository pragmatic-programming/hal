import { CompilationContext } from "kico";

export interface StateCompilation {
    context: CompilationContext,
    run: () => void,
}
