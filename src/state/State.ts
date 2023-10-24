import { PaletteMode } from "@mui/material";
import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";
import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import EdgeData from "../model/EdgeData";
import { LayoutOptions } from "elkjs/lib/elk-api";

export interface State {
    busy: boolean,
    context: CompilationContext;
    edges: Edge<EdgeData>[];
    layout: (getNode: (id: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions: LayoutOptions) => void;
    mode: PaletteMode;
    nodes: Node[];
    onConnect: OnConnect;
    onEdgesChange: OnEdgesChange;
    onNodesChange: OnNodesChange;
    projectName: string,
    renderIhGraph: (ihGraph: IHGraph, getNode: (id: string) => Node | undefined, fitView: () => void) => void;
    run: () => void;
    setContent: (getNode: (id: string) => Node | undefined, editorId: string, content: string | undefined) => void,
    switchMode: () => void;
}
