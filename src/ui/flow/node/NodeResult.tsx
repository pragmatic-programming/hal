import React from "react";
import { NodeProps } from "reactflow";
import { Theme, useTheme } from "@mui/material";
import HandleTarget from "../handle/HandleTarget";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";

export default function NodeResult(props: NodeProps): React.JSX.Element {
    if (!props.targetPosition) {
        throw new Error("TargetPosition is undefined");
    }
    const theme: Theme = useTheme();
    return (
        <>
            <HandleTarget
                nodeId={props.id}
                position={props.targetPosition}
            />
            <BoxBackgroundMain
                style={{
                    borderColor: theme.palette.info.light,
                    borderStyle: "solid",
                    borderWidth: 1,
                    width: 100,
                    height: 100,
                }}
            >
                {props.data.value}
            </BoxBackgroundMain>
        </>
    );
}
