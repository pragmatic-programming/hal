import React, { useState } from "react";
import { InputAdornment, Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { EdgeDefaultLabelTextField } from "./EdgeDefaultLabelTextField";
import { EdgeDefaultLabelIcon } from "./EdgeDefaultLabelIcon";
import { EdgeData } from "../../../model/edge/EdgeData";

interface Props {
    edgeDefinition: EdgeDefinition;
    edgeData: EdgeData;
    id: string;
    label: string;
}


export default function EdgeDefaultLabelVerbose(props: Props): React.JSX.Element {
    const setEdgeLabel = useStore((state: State) => state.flow.setEdgeLabel);
    const setEdgePriority = useStore((state: State) => state.flow.setEdgePriority);
    const [tempPriority, setTempPriority] = useState(props.edgeData.priority.toString());
    const theme: Theme = useTheme();

    function onBlur(): void {
        const parsedPriority: number = parseInt(tempPriority);
        if (isNaN(parsedPriority)) {
            return;
        }
        setEdgePriority(props.id, parsedPriority);
    }

    return (
        <>
            <EdgeDefaultLabelTextField
                size="small"
                InputProps={{
                    inputProps: {
                        style: {
                            textAlign: "center",
                            paddingRight: 0,
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
                value={tempPriority}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTempPriority(event.target.value)}
                onBlur={onBlur}
                style={{
                    backgroundColor: theme.palette.primary.main,
                    width: 60,
                }}
            />
            <EdgeDefaultLabelTextField
                size="small"
                InputProps={{
                    inputProps: {
                        style: {
                            paddingRight: 0,
                        }
                    },
                }}
                value={props.label}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEdgeLabel(props.id, event.target.value)}
                style={{
                    backgroundColor: theme.palette.primary.main,
                    width: Math.max(100, props.label.length * 12),
                }}
            />
        </>
    );
}

