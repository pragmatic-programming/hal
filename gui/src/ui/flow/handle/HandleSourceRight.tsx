import { Position } from "reactflow";
import React from "react";
import HandleSource from "./HandleSource";

interface Props {
    nodeId: string;
}

export default function HandleSourceRight(props: Props): React.JSX.Element {
    return (
        <HandleSource
            id={"right"}
            position={Position.Right}
            {...props}
        />
    );
}
