import { Position } from "reactflow";
import React from "react";
import HandleSource from "./HandleSource";

export default function HandleSourceRight(): React.JSX.Element {
    return (
        <HandleSource
            id={"right"}
            position={Position.Right}
        />
    );
}
