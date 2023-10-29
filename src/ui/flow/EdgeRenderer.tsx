import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from "reactflow";
import { TextField, Theme, useTheme } from "@mui/material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { validEdgeTypes } from "../../model/createEdge";

export function EdgeRenderer(props: EdgeProps): React.JSX.Element {
    const [edgePath, labelX, labelY] = getBezierPath(props);
    const setEdgeLabel = useStore((state: State) => state.setEdgeLabel);
    const theme: Theme = useTheme();
    return (
        <>
            <BaseEdge
                id={props.id}
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
                        error={validEdgeTypes.find(value => value === props.label) === undefined}
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

