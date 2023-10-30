import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { IconButton, Theme, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";

export default function CreationNode(props: NodeProps): React.JSX.Element {
    const theme: Theme = useTheme();
    const toggleDrawer = useStore((state: State) => state.toggleDrawer);
    return (
        <>
            <Handle type="target" position={Position.Left}/>
            <div
                style={{
                    background: theme.palette.primary.main,
                    borderWidth: 1,
                    padding: 10,
                }}
            >
                <IconButton
                    onClick={() => toggleDrawer(props.id)}
                >
                    <Add/>
                </IconButton>
            </div>
        </>
    );
}
