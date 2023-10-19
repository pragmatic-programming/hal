import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import { State } from "../../State";
import React, { CSSProperties, useMemo } from "react";
import EditorNode from "./EditorNode";
import { gui } from "../../constants";
import { useStore } from "../../Store";
import { shallow } from "zustand/shallow";
import { Theme, useTheme } from "@mui/material";


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
    const theme: Theme = useTheme();
    const style: CSSProperties = {
        backgroundColor: theme.palette.gui.canvas.background,
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

