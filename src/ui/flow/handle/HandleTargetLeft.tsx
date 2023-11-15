import { Position } from "reactflow";
import React from "react";
import HandleTarget from "./HandleTarget";

interface Props {
    hidden? : boolean;
    nodeId: string;
}

export default function HandleTargetLeft(props: Props): React.JSX.Element {
    return (
        <HandleTarget
            id={"left"}
            hidden={props.hidden}
            nodeId={props.nodeId}
            position={Position.Left}
        />
    );
}
