import { Position } from "reactflow";
import React from "react";
import HandleTarget from "./HandleTarget";

interface Props {
    nodeId: string;
}

export default function HandleTargetLeft(props: Props): React.JSX.Element {
    return (
        <HandleTarget
            id={"left"}
            position={Position.Left}
            {...props}
        />
    );
}
