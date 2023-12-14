import { Position } from "reactflow";
import React from "react";
import HandleTarget from "./HandleTarget";

interface Props {
    nodeId: string;
}

export default function HandleTargetTop(props: Props): React.JSX.Element {
    return (
        <HandleTarget
            id={"top"}
            position={Position.Top}
            {...props}
        />
    );
}
