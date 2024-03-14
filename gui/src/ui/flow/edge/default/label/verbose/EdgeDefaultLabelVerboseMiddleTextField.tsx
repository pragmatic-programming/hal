import React from "react";
import { Stack } from "@mui/material";
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
    const setEdgeLabel = useStore((state: State) => state.flow.setEdgeLabel);
    const setEdgeType = useStore((state: State) => state.flow.setEdgeEdgeDataDescription);

    let textField: React.JSX.Element = (
        <EdgeDefaultLabelTextField
            onChange={(value: string) => setEdgeType(props.id, value)}
            placeholder={"Description"}
            startAdornment={props.startAdornment}
            value={props.description}
            width={props.rowWidth}
        />
    )

    if (props.showLabel) {
        textField = (
            <EdgeDefaultLabelTextField
                onChange={(value: string) => setEdgeLabel(props.id, value)}
                placeholder={"Label"}
                startAdornment={props.startAdornment}
                value={props.label}
                width={props.rowWidth}
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
