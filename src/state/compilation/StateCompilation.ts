import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";

export interface StateCompilation {
    context: CompilationContext,
    render: (ihGraph: IHGraph, fitView: () => void) => void,
    run: () => void,
}
