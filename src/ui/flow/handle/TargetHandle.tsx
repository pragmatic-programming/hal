import { Position } from "reactflow";
import React, { CSSProperties } from "react";
import { StyledHandle } from "./StyledHandle";

interface Props {
    style?: CSSProperties;
}

export default function TargetHandle(props: Props): React.JSX.Element {
    return (
        <StyledHandle
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
