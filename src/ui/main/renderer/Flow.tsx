import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { State } from "../../../State";
import React, { useMemo } from "react";
import EditorNode from "./EditorNode";
import { gui } from "../../../constants";
import { useStore } from "../../../Store";
import { shallow } from "zustand/shallow";


const selector = (state: State) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
});

export default function Flow(): React.JSX.Element {
    const nodeTypes = useMemo(() => ({editorNode: EditorNode}), []);
    const {nodes, edges, onNodesChange, onEdgesChange, onConnect} = useStore(selector, shallow);

    return (
        <div
            style={{
                height: "calc(100vh - " + gui.bottomHeight + "px)",
                width: "calc(100vw - " + gui.menuWidth + "px)",
            }}
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
                <Controls
                    position={"bottom-right"}
                />
            </ReactFlow>
        </div>
    );
}

