import { Edge, FitViewOptions, Node, OnConnect, OnEdgesChange, OnNodesChange } from "reactflow";
import NodeData from "../../model/NodeData";
import { EdgePathStyle } from "../EdgePathStyle";
import { LayoutOptions } from "elkjs/lib/elk-api";
import { nodeType } from "../../ui/flow/flow/NodeTypes";

export interface ReactFlow {
    connectingSourceNodeId: string | null,
    edgePathStyle: EdgePathStyle
    edges: Edge[],
    layout: (getNode: (nodeId: string) => Node | undefined, fitView: (fitViewOptions: FitViewOptions) => void, layoutOptions?: LayoutOptions) => void,
    nodes: Node<NodeData>[],
    onConnect: OnConnect,
    onEdgesChange: OnEdgesChange,
    onNodesChange: OnNodesChange,
    setConnectingSourceNodeId: (nodeId: string | null) => void,
    setEdgeLabel: (nodeId: string, label: string) => void,
    setEdgePathStyle: (edgePathStyle: EdgePathStyle) => void,
    setNodeNodeData: (nodeId: string, nodeData: Partial<NodeData>) => void,
    setNodeType: (nodeId: string, type: nodeType) => void,
}
