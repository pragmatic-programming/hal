import { Edge } from "../../model/Edge";
import React from "react";
import { EdgeStyle } from "../../model/EdgeStyle";

interface Props {
    edge: Edge;
    leftOffset: number;
}

export default function LineRenderer(props: Props): JSX.Element {
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
            y1={props.edge.start.y + props.leftOffset}
            x2={props.edge.end.x - 10}
            y2={props.edge.end.y + props.leftOffset}
            strokeWidth="5"
            strokeDasharray={strokeDashArray(props.edge)}
            stroke="white"
            markerEnd="url(#arrow)"
        />
    );
}
