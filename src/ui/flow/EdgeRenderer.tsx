import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getBezierPath } from "reactflow";
import { TextField } from "@mui/material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export function EdgeRenderer(props: EdgeProps): React.JSX.Element {
    const [edgePath, labelX, labelY] = getBezierPath(props);
    const setEdgeLabel = useStore((state: State) => state.setEdgeLabel);
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
                        value={props.label}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEdgeLabel(props.id, event.target.value)}
                        style={{
                            backgroundColor: "#ffffff",
                            width: 100,
                        }}
                    />
                </div>
            </EdgeLabelRenderer>
        </>
    );
}

