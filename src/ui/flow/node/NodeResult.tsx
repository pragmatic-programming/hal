import React from "react";
import { NodeProps } from "reactflow";
import { Theme, useTheme } from "@mui/material";
import HandleTarget from "../handle/HandleTarget";

export default function NodeResult(props: NodeProps): React.JSX.Element {
    const theme: Theme = useTheme();

    return (
        <>
            <HandleTarget
                nodeId={props.id}
            />
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
