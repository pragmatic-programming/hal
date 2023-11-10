import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import { NodeData } from "../../model/node/NodeData";
import { EdgePathStyle } from "./EdgePathStyle";
import { LayoutOptions } from "elkjs/lib/elk-api";
import { LanguageIndicator } from "../../model/node/LanguageIndicator";
import { NodeTypeIndicator } from "../../model/node/NodeTypeIndicator";

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
    setNodeNodeDataLanguage: (nodeId: string, language: LanguageIndicator) => void,
    transformCreationNode: (nodeId: string, type: NodeTypeIndicator) => void,
}
