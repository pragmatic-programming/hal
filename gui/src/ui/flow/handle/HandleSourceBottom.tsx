import { Position } from "reactflow";
import React from "react";
import HandleSource from "./HandleSource";

interface Props {
    nodeId: string;
}

export default function HandleSourceBottom(props: Props): React.JSX.Element {
    return (
        <HandleSource
            id={"bottom"}
            position={Position.Bottom}
            {...props}
        />
    );
}
