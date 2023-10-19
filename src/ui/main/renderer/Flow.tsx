import ReactFlow, { Background, Controls, Panel } from "reactflow";
import "reactflow/dist/style.css";
import { State } from "../../../State";
import React, { useMemo } from "react";
import EditorNode from "./EditorNode";
import { gui } from "../../../constants";
import { useStore } from "../../../Store";
import { shallow } from "zustand/shallow";
import { useLayouting } from "./Layouting";
import { Button, Stack } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import BoltIcon from '@mui/icons-material/Bolt';


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
    const layout = useLayouting();

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
                <Panel position="top-right">
                    <Stack direction="row" spacing={2}>
                        <Button
                            onClick={() => layout({"elk.algorithm": "layered", "elk.direction": "DOWN"})}
                            startIcon={<MoreVertIcon/>}
                            variant="contained"
                        >
                            vertical
                        </Button>
                        <Button
                            onClick={() => layout({"elk.algorithm": "layered", "elk.direction": "RIGHT"})}
                            startIcon={<MoreHorizIcon/>}
                            variant="contained"
                        >
                            horizontal
                        </Button>
                        <Button
                            onClick={() => layout({"elk.algorithm": "org.eclipse.elk.radial"})}
                            startIcon={<DataUsageIcon/>}
                            variant="contained"
                        >
                            radial
                        </Button>
                        <Button
                            variant="contained"
                            color="info"
                            startIcon={<BoltIcon/>}
                            onClick={() => layout({"elk.algorithm": "org.eclipse.elk.force",})}
                        >
                            force
                        </Button>
                    </Stack>
                </Panel>
                <Background/>
                <Controls
                    position={"bottom-right"}
                />
            </ReactFlow>
        </div>
    );
}

