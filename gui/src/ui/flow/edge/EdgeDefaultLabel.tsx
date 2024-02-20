import React from "react";
import { InputAdornment, Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { EdgeDefaultLabelTextField } from "./EdgeDefaultLabelTextField";
import { EdgeDefaultLabelCross } from "./EdgeDefaultLabelCross";
import { EdgeDefaultLabelIcon } from "./EdgeDefaultLabelIcon";
import { EdgeData } from "../../../model/edge/EdgeData";

interface Props {
    edgeDefinition: EdgeDefinition;
    edgeData: EdgeData;
    id: string;
    label: string;
}

export default function EdgeDefaultLabel(props: Props): React.JSX.Element {
    const setEdgeLabel = useStore((state: State) => state.flow.setEdgeLabel);
    const setEdgePriority = useStore((state: State) => state.flow.setEdgePriority);
    const verboseMode: boolean = useStore((state: State) => state.flow.verboseMode);
    const theme: Theme = useTheme();
    let content: React.JSX.Element = (
        <EdgeDefaultLabelCross
            edgeDefinition={props.edgeDefinition}
            edgePathStyle={props.edgeData.edgePathStyle}
            id={props.id}
        />
    );
    if (verboseMode) {
        content = (
            <>
                <EdgeDefaultLabelTextField
                    size="small"
                    InputProps={{
                        inputProps: {
                            style: {
                                textAlign: "center",
                            }
                        },
                        startAdornment: (
                            <InputAdornment position="start">
                                <EdgeDefaultLabelIcon
                                    icon={props.edgeDefinition.icon}
                                    id={props.id}
                                />
                            </InputAdornment>
                        ),
                    }}
                    value={props.edgeData.priority}
                    // todo bug NaN
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEdgePriority(props.id, parseInt(event.target.value))}
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        width: 100,
                    }}
                />
                <EdgeDefaultLabelTextField
                    size="small"
                    value={props.label}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEdgeLabel(props.id, event.target.value)}
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        width: Math.max(130, props.label.length * 12),
                    }}
                />
            </>
        );
    }
    return content;
}

