import { PaletteMode } from "@mui/material";
import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";
import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import { LayoutOptions } from "elkjs/lib/elk-api";
import NodeData from "../model/NodeData";

export interface EditorOpenState {
    nodeId: string,
    content: string | undefined,
    label: string,
}

export interface DrawerState {
    nodeId: string,
}

export interface State {
    busy: boolean,
    editorOpen: EditorOpenState | undefined,
    editorOpenSetContent: (content: string | undefined) => void,
    editorOpenSetLabel: (content: string) => void,
    context: CompilationContext,
    drawerOpen: DrawerState | undefined,
    edges: Edge[],
    layout: (getNode: (id: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions?: LayoutOptions) => void,
    mode: PaletteMode,
    nodes: Node<NodeData>[],
    onConnect: OnConnect,
    onEdgesChange: OnEdgesChange,
    onNodesChange: OnNodesChange,
    openEditor: (getNode: (id: string) => Node | undefined, editorId: string | undefined) => void,
    projectName: string,
    renderIhGraph: (ihGraph: IHGraph, getNode: (id: string) => Node | undefined, fitView: () => void) => void,
    run: () => void,
    setEdgeLabel: (editorId: string, label: string) => void,
    setNodeLabel: (editorId: string, label: string) => void,
    setNodeType: (editorId: string, type: string) => void,
    setNodeValue: (editorId: string, content: string | undefined) => void,
    switchMode: () => void,
    toggleDrawer: (nodeId: string | undefined) => void,
}
