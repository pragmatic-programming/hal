import React from "react";
import { BaseEdge, Edge, EdgeLabelRenderer, EdgeProps, useReactFlow } from "reactflow";
import { TextField, Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";

import { isEdgeTypeIndicator } from "../../../model/edge/EdgeTypeIndicator";
import { getEdgePath } from "../../../util";
import { retrieveEdgeDefinition } from "../../../model/edge/edgeDefinitions";


export default function EdgeDefault(props: EdgeProps): React.JSX.Element {
    const edgePathStyle = useStore((state: State) => state.reactFlow.edgePathStyle);
    let {edgePath, labelX, labelY} = getEdgePath(edgePathStyle, props);
    const setEdgeLabel = useStore((state: State) => state.reactFlow.setEdgeLabel);
    const {getEdge,} = useReactFlow();
    const edge: Edge | undefined = getEdge(props.id);
    if (!edge) {
        throw new Error("Edge is undefined");
    }
    if (!edge.type) {
        throw new Error("Edge.type is undefined");
    }
    if (!isEdgeTypeIndicator(edge.type)) {
        throw new Error("EdgeType is not a valid edgeTypeIndicator");
    }
    const edgeDefinition = retrieveEdgeDefinition(edge.type);
    const theme: Theme = useTheme();
    return (
        <>
            <BaseEdge
                id={props.id}
                markerEnd={props.markerEnd}
                path={edgePath}
                style={edgeDefinition.style}
            />
            <EdgeLabelRenderer>
                <div
                    style={{
                        pointerEvents: "all",
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    }}
                    className="nopan nodrag"
                >
                    <TextField
                        variant="outlined"
                        size="small"
                        InputProps={{
                            inputProps: {
                                style: {
                                    textAlign: "center",
                                }
                            }
                        }}
                        value={props.label}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEdgeLabel(props.id, event.target.value)}
                        style={{
                            backgroundColor: theme.palette.primary.light,
                            width: 100,
                        }}
                    />
                </div>
            </EdgeLabelRenderer>
        </>
    );
}

