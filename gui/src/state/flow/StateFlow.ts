import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import { NodeData } from "../../model/node/NodeData";
import { EdgePathStyle } from "../../model/edge/EdgePathStyle";
import { LanguageIndicator } from "../../model/node/LanguageIndicator";
import { IHGraph } from "@pragmatic-programming/ihgraph";
import { EdgeDefinition } from "../../model/edge/EdgeDefinition";
import { NodeDefinition } from "../../model/node/NodeDefinition";
import { LayoutOptionTypeIndicator } from "../../util";
import { ModeIndicator } from "./ModeIndicator";

export interface StateFlow {
    addNodeCreate: () => void,
    connectingSourceNodeId: string | null,
    connectingSourceHandleId: "right" | "bottom" | null,
    edges: Edge[],
    layout: (fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions: LayoutOptionTypeIndicator) => void,
    layoutOption: LayoutOptionTypeIndicator,
    nextNodeId: () => string,
    nodes: Node<NodeData>[],
    onConnect: OnConnect,
    onEdgesChange: OnEdgesChange,
    onNodesChange: OnNodesChange,
    render: (ihGraph: IHGraph, fitView: (fitViewOptions: FitViewOptions) => void, projectName?: string) => void,
    setConnectingSource: (handleType: "right" | "bottom" | null, nodeId: string | null) => void,
    setEdgeEdgeDataDescription: (edgeId: string, description: string) => void,
    setEdgeLabel: (edgeId: string, label: string) => void,
    setEdgePathStyleForAll: (edgePathStyle: EdgePathStyle) => void,
    setEdgePathStyleForEdge: (edgeId: string, edgePathStyle: EdgePathStyle) => void,
    setEdgeEdgeDataPriority: (edgeId: string, priority: number) => void,
    setNodeNodeDataContent: (nodeId: string, content: string | undefined) => void,
    setNodeNodeDataLabel: (nodeId: string, label: string) => void,
    setNodeNodeDataLanguage: (nodeId: string, language: LanguageIndicator) => void,
    cycleMode: () => void,
    transformCreateEdge: (edgeId: string, edgeDefinition: EdgeDefinition, targetNodeId: string) => void,
    transformCreateNode: (nodeId: string, nodeDefinition: NodeDefinition, targetEdgeId: string | null | undefined) => void,
    mode: ModeIndicator,
    toggleHierarchyMode: (fitView: (fitViewOptions: FitViewOptions) => void) => void,
    hierarchyMode: boolean,
    lastRenderGraph: IHGraph | null,
}
