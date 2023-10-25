import { PaletteMode } from "@mui/material";
import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";
import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import { LayoutOptions } from "elkjs/lib/elk-api";
import NodeData from "../model/NodeData";

export interface State {
    busy: boolean,
    context: CompilationContext;
    edges: Edge[];
    layout: (getNode: (id: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions: LayoutOptions) => void;
    mode: PaletteMode;
    nodes: Node<NodeData>[];
    onConnect: OnConnect;
    onEdgesChange: OnEdgesChange;
    onNodesChange: OnNodesChange;
    projectName: string,
    renderIhGraph: (ihGraph: IHGraph, getNode: (id: string) => Node | undefined, fitView: () => void) => void;
    run: () => void;
    setNodeValue: (editorId: string, content: string | undefined) => void,
    setNodeLabel: (editorId: string, label: string) => void,
    setEdgeLabel: (editorId: string, label: string) => void,
    switchMode: () => void;
}
