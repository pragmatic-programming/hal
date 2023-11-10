import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import { NodeData } from "../../model/NodeData";
import { EdgePathStyle } from "./EdgePathStyle";
import { LayoutOptions } from "elkjs/lib/elk-api";
import { nodeType } from "../../model/NodeTypes";
import { Language } from "../../model/Languages";

export interface StateReactFlow {
    connectingSourceNodeId: string | null,
    edgePathStyle: EdgePathStyle
    edges: Edge[],
    layout: (fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions?: LayoutOptions) => void,
    nextNodeId: () => string,
    nodes: Node<NodeData>[],
    onConnect: OnConnect,
    onEdgesChange: OnEdgesChange,
    onNodesChange: OnNodesChange,
    setConnectingSourceNodeId: (nodeId: string | null) => void,
    setEdgeLabel: (nodeId: string, label: string) => void,
    setEdgePathStyle: (edgePathStyle: EdgePathStyle) => void,
    setNodeNodeDataContent: (nodeId: string, content: string | undefined) => void,
    setNodeNodeDataLabel: (nodeId: string, label: string) => void,
    setNodeNodeDataLanguage: (nodeId: string, language: Language) => void,
    transformCreationNode: (nodeId: string, type: nodeType) => void,
}
