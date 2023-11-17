import { Position } from "reactflow";
import React, { CSSProperties } from "react";
import HandleStyled from "./HandleStyled";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { Theme, useTheme } from "@mui/material";
import { SourceHandleId } from "../../../model/edge/SourceHandleId";

interface Props {
    style?: CSSProperties;
    position: Position;
    id: SourceHandleId;
}

export default function HandleSource(props: Props): React.JSX.Element {
    const connecting: boolean = useStore((state: State) => state.reactFlow.connectingSourceNodeId !== null);
    const theme: Theme = useTheme();
    let style: CSSProperties = {};
    if (connecting) {
        style = {
            ...style,
            backgroundColor: theme.palette.error.light
        };
    }
    return (
        <HandleStyled
            style={style}
            type="source"
            {...props}
        />
    );
}
