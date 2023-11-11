import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps } from "reactflow";
import { TextField, Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";

import { isEdgeTypeIndicator } from "../../../model/edge/EdgeTypeIndicator";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { getEdgePath } from "../../../util";

interface Props extends EdgeProps {
    edgeDefinition: EdgeDefinition;
}

// new edge (step 4): add a new edge component in the same folder of EdgeDefault, wrap EdgeDefault like in EdgeExecute
// and add the component to the new EdgeDefinition of step 2
export default function EdgeDefault(props: Props): React.JSX.Element {
    const edgePathStyle = useStore((state: State) => state.reactFlow.edgePathStyle);
    let {edgePath, labelX, labelY} = getEdgePath(edgePathStyle, props);
    const setEdgeLabel = useStore((state: State) => state.reactFlow.setEdgeLabel);
    const theme: Theme = useTheme();
    return (
        <>
            <BaseEdge
                id={props.id}
                markerEnd={props.markerEnd}
                path={edgePath}
                style={props.edgeDefinition.style}
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
                        error={!isEdgeTypeIndicator(props.label)}
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

