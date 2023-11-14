import { Position } from "reactflow";
import React from "react";
import HandleSource from "./HandleSource";


export default function HandleSourceTop(): React.JSX.Element {
    return (
        <HandleSource
            id={"bottom"}
            position={Position.Bottom}
        />
    );
}
