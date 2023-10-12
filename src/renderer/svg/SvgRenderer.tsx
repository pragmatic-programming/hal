import { Edge } from "../../model/Edge";
import React from "react";
import LineRenderer from "./LineRenderer";
import { useStore } from "../../Store";
import { State } from "../../State";
import { Theme, useTheme } from "@mui/material";

export default function SvgRenderer(): React.JSX.Element {
    const edges: Edge[] = useStore((state: State) => state.project.edges());
    const theme: Theme = useTheme();
    return (
        <svg>
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="4"
                    markerHeight="4"
                    orient="auto-start-reverse"
                >
                    <path d="M 0 0 L 10 5 L 0 10 z"
                          stroke={theme.palette.edge}
                          fill={theme.palette.edge}
                    />
                </marker>
            </defs>
            {edges.map((edge: Edge) => <LineRenderer key={edge.key} edge={edge}/>)}
        </svg>
    );
}
