import React, { CSSProperties } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Theme, useTheme } from "@mui/material";

export default function ResultNode(props: NodeProps): React.JSX.Element {
    const theme: Theme = useTheme();

    const style: Partial<CSSProperties> = {
        borderColor: theme.palette.info.light,
        borderStyle: "solid",
        borderWidth: 1,
        background: theme.palette.gui.menu.background,
        width: 100,
        height: 100,
    };

    return (
        <>
            <Handle type="target" position={Position.Left}/>
            <div
                style={style}
            >
                {props.data.value}
            </div>
        </>
    );
}
