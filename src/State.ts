import { PaletteMode } from "@mui/material";
import { CompilationContext } from "kico";
import { IHGraph } from "../../ihgraph";
import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";

export class FlowState {
    constructor(
        readonly nodes: Node[],
        readonly edges: Edge[]
    ) {
    }
}

export interface State {
    //start reactflow
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    //end reactflow
    projectName: string,
    locked: boolean;
    context: CompilationContext;
    mode: PaletteMode;
    renderIhGraph: (ihGraph: IHGraph) => void;
    run: () => void;
    switchMode: () => void;
    switchLocked: () => void;
}
