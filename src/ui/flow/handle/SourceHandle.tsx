import { Position } from "reactflow";
import React, { CSSProperties } from "react";
import { StyledHandle } from "./StyledHandle";

interface Props {
    id: string;
    style?: CSSProperties;
}

export default function SourceHandle(props: Props): React.JSX.Element {
    return (
        <StyledHandle
            id={props.id}
            position={Position.Right}
            style={{
                ...props.style,
                padding: 5,
                right: -8,
            }}
            type="source"
        />
    );
}
