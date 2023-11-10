import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath, getSmoothStepPath, getStraightPath } from "reactflow";
import { TextField, Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { isEdgeType } from "../../../model/EdgeTypes";

export default function EdgedStyled(props: EdgeProps): React.JSX.Element {
    const edgePathStyle = useStore((state: State) => state.reactFlow.edgePathStyle);
    let edgePath, labelX, labelY;
    switch (edgePathStyle) {
        case "Straight":
            [edgePath, labelX, labelY] = getStraightPath(props);
            break;
        case "Smooth":
            [edgePath, labelX, labelY] = getSmoothStepPath(props);
            break;
        default:
            [edgePath, labelX, labelY] = getBezierPath(props);
    }
    const setEdgeLabel = useStore((state: State) => state.reactFlow.setEdgeLabel);
    const theme: Theme = useTheme();
    return (
        <>
            <BaseEdge
                id={props.id}
                markerEnd={props.markerEnd}
                path={edgePath}
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
                        error={!isEdgeType(props.label)}
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

