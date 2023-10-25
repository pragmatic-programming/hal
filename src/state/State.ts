import { PaletteMode } from "@mui/material";
import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";
import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import EdgeData from "../model/EdgeData";
import { LayoutOptions } from "elkjs/lib/elk-api";
import NodeData from "../model/NodeData";

export interface State {
    busy: boolean,
    context: CompilationContext;
    edges: Edge<EdgeData>[];
    layout: (getNode: (id: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions: LayoutOptions) => void;
    mode: PaletteMode;
    nodes: Node<NodeData>[];
    onConnect: OnConnect;
    onEdgesChange: OnEdgesChange;
    onNodesChange: OnNodesChange;
    projectName: string,
    renderIhGraph: (ihGraph: IHGraph, getNode: (id: string) => Node | undefined, fitView: () => void) => void;
    run: () => void;
    setNodeValue: (getNode: (id: string) => Node | undefined, editorId: string, content: string | undefined) => void,
    setNodeLabel: (getNode: (id: string) => Node | undefined, editorId: string, label: string ) => void,
    switchMode: () => void;
}
