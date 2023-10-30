import { Position } from "reactflow";
import React, { CSSProperties } from "react";
import HandleStyled from "./HandleStyled";

interface Props {
    id: string;
    style?: CSSProperties;
}

export default function HandleSource(props: Props): React.JSX.Element {
    return (
        <HandleStyled
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
