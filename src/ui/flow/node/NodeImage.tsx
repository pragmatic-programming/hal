import React from "react";
import { NodeProps } from "reactflow";
import HandleTarget from "../handle/HandleTarget";

export default function NodeImage(props: NodeProps): React.JSX.Element {
    if (!props.targetPosition) {
        throw new Error("TargetPosition is undefined");
    }
    return (
        <>
            <HandleTarget
                nodeId={props.id}
                position={props.targetPosition}
            />
            <img style={{width: 1000}} src={props.data.content} alt={props.id}/>
        </>
    );
}
