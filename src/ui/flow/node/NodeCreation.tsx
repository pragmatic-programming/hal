import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { IconButton, Theme, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";

export default function NodeCreation(props: NodeProps): React.JSX.Element {
    const theme: Theme = useTheme();
    const openNewNodeDialog = useStore((state: State) => state.openNewNodeDialog);
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
                    onClick={() => openNewNodeDialog(props.id)}
                >
                    <Add/>
                </IconButton>
            </div>
        </>
    );
}
