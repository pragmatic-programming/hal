import { PaletteMode } from "@mui/material";
import { CompilationContext } from "kico";
import { IHGraph } from "../../ihgraph";
import { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import EdgeData from "./model/EdgeData";
import { LayoutOptions } from "elkjs/lib/elk-api";

export class FlowState {
    constructor(
        readonly nodes: Node[],
        readonly edges: Edge<EdgeData>[]
    ) {
    }
}

export interface State {
    //start reactflow
    nodes: Node[];
    edges: Edge<EdgeData>[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    //end reactflow
    projectName: string,
    locked: boolean;
    context: CompilationContext;
    mode: PaletteMode;
    layout: (getNode: (id: string) => Node | undefined, fitView: () => void, layoutOptions: LayoutOptions) => void;
    renderIhGraph: (ihGraph: IHGraph, getNode: (id: string) => Node | undefined, fitView: () => void) => void;
    run: () => void;
    switchMode: () => void;
    switchLocked: () => void;
}
