import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import { NodeData } from "../../model/node/NodeData";
import { EdgePathStyle } from "../../model/edge/EdgePathStyle";
import { LanguageIndicator } from "../../model/node/LanguageIndicator";
import { IHGraph } from "ihgraph";
import { EdgeDefinition } from "../../model/edge/EdgeDefinition";
import { NodeDefinition } from "../../model/node/NodeDefinition";
import { LayoutOptionTypeIndicator } from "../../util";

export interface StateFlow {
    addNodeCreate: () => void,
    connectingSourceNodeId: string | null,
    edgePathStyle: EdgePathStyle
    edges: Edge[],
    layout: (fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions: LayoutOptionTypeIndicator) => void,
    layoutOption: LayoutOptionTypeIndicator,
    nextNodeId: () => string,
    nodes: Node<NodeData>[],
    onConnect: OnConnect,
    onEdgesChange: OnEdgesChange,
    onNodesChange: OnNodesChange,
    render: (ihGraph: IHGraph, fitView: () => void, projectName?: string) => void,
    setConnectingSourceNodeId: (nodeId: string | null) => void,
    setEdgeLabel: (nodeId: string, label: string) => void,
    setEdgePathStyle: (edgePathStyle: EdgePathStyle) => void,
    setNodeNodeDataContent: (nodeId: string, content: string | undefined) => void,
    setNodeNodeDataLabel: (nodeId: string, label: string) => void,
    setNodeNodeDataLanguage: (nodeId: string, language: LanguageIndicator) => void,
    transformCreateNode: (nodeId: string, nodeDefinition: NodeDefinition, targetEdgeId: string | null | undefined) => void,
    transformCreateEdge: (edgeId: string, edgeDefinition: EdgeDefinition, targetNodeId: string) => void,
}
