import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";
import { Node } from "reactflow";

export interface StateCompilation{
    context: CompilationContext,
    render: (ihGraph: IHGraph, getNode: (nodeId: string) => Node | undefined, fitView: () => void) => void,
    run: () => void,
}
