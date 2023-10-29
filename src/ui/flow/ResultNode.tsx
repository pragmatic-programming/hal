import React from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Theme, useTheme } from "@mui/material";

export default function ResultNode(props: NodeProps): React.JSX.Element {
    const theme: Theme = useTheme();

    return (
        <>
            <Handle type="target" position={Position.Left}/>
            <div
                style={{
                    borderColor: theme.palette.info.light,
                    borderStyle: "solid",
                    borderWidth: 1,
                    background: theme.palette.primary.main,
                    width: 100,
                    height: 100,
                }}
            >
                {props.data.value}
            </div>
        </>
    );
}
