import { PaletteMode } from "@mui/material";
import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";
import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import EdgeData from "../model/EdgeData";
import { LayoutOptions } from "elkjs/lib/elk-api";

export interface State {
    //start reactflow
    nodes: Node[];
    edges: Edge<EdgeData>[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    //end reactflow
    busy: boolean,
    projectName: string,
    context: CompilationContext;
    mode: PaletteMode;
    layout: (getNode: (id: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions: LayoutOptions) => void;
    renderIhGraph: (ihGraph: IHGraph, getNode: (id: string) => Node | undefined, fitView: () => void) => void;
    run: () => void;
    switchMode: () => void;
}
