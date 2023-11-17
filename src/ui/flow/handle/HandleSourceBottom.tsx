import { Position } from "reactflow";
import React from "react";
import HandleSource from "./HandleSource";

export default function HandleSourceBottom(): React.JSX.Element {
    return (
        <HandleSource
            id={"bottom"}
            position={Position.Bottom}
        />
    );
}
