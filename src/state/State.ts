import { PaletteMode } from "@mui/material";
import { CompilationContext } from "kico";
import { IHGraph } from "ihgraph";
import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import { LayoutOptions } from "elkjs/lib/elk-api";
import NodeData from "../model/NodeData";
import { DrawerState } from "./substates/DrawerState";
import { EditorOpenState } from "./substates/EditorOpenState";

export interface State {
    //state
    busy: boolean,
    context: CompilationContext,
    drawerOpen: DrawerState | undefined,
    edges: Edge[],
    editorOpen: EditorOpenState | undefined,
    mode: PaletteMode,
    nodes: Node<NodeData>[],
    projectName: string,
    //manipulators
    editorOpenSetContent: (content: string | undefined) => void,
    editorOpenSetLabel: (content: string) => void,
    layout: (getNode: (id: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions?: LayoutOptions) => void,
    onConnect: OnConnect,
    onEdgesChange: OnEdgesChange,
    onNodesChange: OnNodesChange,
    openEditor: (getNode: (id: string) => Node | undefined, editorId: string | undefined) => void,
    renderIhGraph: (ihGraph: IHGraph, getNode: (id: string) => Node | undefined, fitView: () => void) => void,
    run: () => void,
    setEdgeLabel: (editorId: string, label: string) => void,
    setNodeLabel: (editorId: string, label: string) => void,
    setNodeType: (editorId: string, type: string) => void,
    setNodeValue: (editorId: string, content: string | undefined) => void,
    switchMode: () => void,
    toggleDrawer: (nodeId: string | undefined) => void,
}
