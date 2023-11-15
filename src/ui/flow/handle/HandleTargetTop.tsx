import { Position } from "reactflow";
import React from "react";
import HandleTarget from "./HandleTarget";

interface Props {
    hidden?: boolean
    nodeId: string;
}

export default function HandleTargetTop(props: Props): React.JSX.Element {
    return (
        <HandleTarget
            hidden={props.hidden}
            id={"top"}
            nodeId={props.nodeId}
            position={Position.Top}
        />
    );
}
