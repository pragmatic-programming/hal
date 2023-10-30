import ReactFlow, { Background, Controls, EdgeTypes, ReactFlowInstance } from "reactflow";
import "reactflow/dist/style.css";
import { State } from "../../state/State";
import React, { CSSProperties, useMemo } from "react";
import EditorNode from "./node/EditorNode";
import { gui } from "../../constants";
import { useStore } from "../../state/Store";
import { shallow } from "zustand/shallow";
import ResultNode from "./node/ResultNode";
import { EdgeRenderer } from "./edge/EdgeRenderer";


const selector = (state: State) => ({
    nodes: state.nodes,
    edges: state.edges,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    layout: state.layout
});

const edgeTypes: EdgeTypes = {
    sequence: EdgeRenderer,
    execute: EdgeRenderer,
};

export default function Flow(): React.JSX.Element {
    const nodeTypes = useMemo(() => ({editorNode: EditorNode, resultNode: ResultNode}), []);
    const {layout, nodes, edges, onNodesChange, onEdgesChange, onConnect} = useStore(selector, shallow);
    const style: CSSProperties = {
        left: gui.menuWidth,
        position: "fixed",
        top: 0,
        height: "calc(100vh - " + gui.bottomHeight + "px)",
        width: "calc(100vw - " + gui.menuWidth + "px)",
    };

    return (
        <div
            style={style}
        >
            <ReactFlow
                edgeTypes={edgeTypes}
                edges={edges}
                nodeTypes={nodeTypes}
                nodes={nodes}
                onConnect={onConnect}
                onEdgesChange={onEdgesChange}
                onInit={(reactFlowInstance: ReactFlowInstance) => layout(reactFlowInstance.getNode, reactFlowInstance.fitView, {})}
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

