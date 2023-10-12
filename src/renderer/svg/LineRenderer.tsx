import { Edge } from "../../model/Edge";
import React from "react";
import { EdgeStyle } from "../../model/EdgeStyle";
import { Theme, useTheme } from "@mui/material";

interface Props {
    edge: Edge;
}

export default function LineRenderer(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();

    function strokeDashArray(edge: Edge) {
        if (edge.style === EdgeStyle.solid) {
            return "none";
        }
        if (edge.style === EdgeStyle.dotted) {
            return "5,5";
        }
        throw Error("Unhandled EdgeStyle");
    }

    return (
        <line
            key={props.edge.key}
            x1={props.edge.start.x}
            y1={props.edge.start.y}
            x2={props.edge.end.x}
            y2={props.edge.end.y}
            strokeWidth="5"
            strokeDasharray={strokeDashArray(props.edge)}
            stroke={theme.palette.edge}
            markerEnd="url(#arrow)"
        />
    );
}
