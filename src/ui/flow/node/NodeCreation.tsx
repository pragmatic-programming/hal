import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { IconButton } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";

export default function NodeCreation(props: NodeProps): React.JSX.Element {
    const dialogOpen = useStore((state: State) => state.dialog.dialogOpen);
    return (
        <>
            <Handle type="target" position={Position.Left}/>
            <BoxBackgroundMain
                style={{
                    padding: 10,
                }}
            >
                <IconButton
                    onClick={() => dialogOpen(props.id)}
                >
                    <Add/>
                </IconButton>
            </BoxBackgroundMain>
        </>
    );
}
