import React from "react";
import { Stack, Theme, useTheme } from "@mui/material";
import { useStore } from "../../../../../../state/Store";
import { State } from "../../../../../../state/State";
import { EdgeDefaultLabelTextField } from "./EdgeDefaultLabelTextField";

interface Props {
    description: string,
    id: string,
    label: string,
    rowWidth: number,
    showLabel: boolean,
    startAdornment: React.JSX.Element | undefined,
}


export default function EdgeDefaultLabelVerboseMiddleTextField(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    const setEdgeLabel = useStore((state: State) => state.flow.setEdgeLabel);
    const setEdgeType = useStore((state: State) => state.flow.setEdgeEdgeDataDescription);

    let textField: React.JSX.Element = (
        <EdgeDefaultLabelTextField
            startAdornment={props.startAdornment}
            onChange={(value: string) => setEdgeType(props.id, value)}
            style={{
                backgroundColor: theme.palette.primary.main,
                width: props.rowWidth,
            }}
            value={props.description}
        />
    )

    if (props.showLabel) {
        textField = (
            <EdgeDefaultLabelTextField
                startAdornment={props.startAdornment}
                onChange={(value: string) => setEdgeLabel(props.id, value)}
                style={{
                    backgroundColor: theme.palette.primary.main,
                    width: props.rowWidth,
                }}
                value={props.label}
            />
        )
    }

    return (
        <Stack
            style={{
                width: props.rowWidth,
            }}
        >
            {textField}
        </Stack>
    );
}
