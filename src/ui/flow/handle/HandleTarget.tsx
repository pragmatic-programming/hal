import { Position } from "reactflow";
import React, { CSSProperties } from "react";
import HandleStyled from "./HandleStyled";

interface Props {
    style?: CSSProperties;
}

export default function HandleTarget(props: Props): React.JSX.Element {
    return (
        <HandleStyled
            id="input"
            position={Position.Left}
            style={{
                ...props.style,
                padding: 5,
                left: -8,
            }}
            type="target"
        />
    );
}
