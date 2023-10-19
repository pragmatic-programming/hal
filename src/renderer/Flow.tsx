import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Connection,
    Controls,
    Edge,
    EdgeChange,
    NodeChange
} from "reactflow";
import "reactflow/dist/style.css";
import { useStore } from "../Store";
import { FlowState, State } from "../State";
import React, { useCallback, useMemo, useState } from "react";
import EditorNode from "./EditorNode";

export default function Flow(): React.JSX.Element {
    const flow: FlowState = useStore((state: State) => state.flow);
    const nodeTypes = useMemo(() => ({textUpdater: EditorNode}), []);
    const [nodes, setNodes] = useState(flow.nodes);
    const [edges, setEdges] = useState(flow.edges);
    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds: Edge[]) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );
    return (
        <div
            style={{height: "100%"}}
        >
            <ReactFlow
                edges={edges}
                nodeTypes={nodeTypes}
                nodes={nodes}
                onConnect={onConnect}
                onEdgesChange={onEdgesChange}
                onNodesChange={onNodesChange}
            >
                <Background/>
                <Controls/>
            </ReactFlow>
        </div>
    );
}

