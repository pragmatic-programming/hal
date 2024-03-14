import React, { useState } from "react";
import { InputAdornment, Stack, Theme, useTheme } from "@mui/material";
import { useStore } from "../../../../../../state/Store";
import { State } from "../../../../../../state/State";
import { EdgeDefaultLabelTextField } from "./EdgeDefaultLabelTextField";
import ButtonToggle from "../../../../../util/ButtonToggle";
import Description from "@mui/icons-material/Description";
import LabelOnIcon from "@mui/icons-material/Label";

interface Props {
    description: string,
    iconSize: number,
    id: string,
    label: string,
    rowWidth: number,
    showIcon: boolean,
}


export default function EdgeDefaultLabelVerboseMiddle(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    const setEdgeLabel = useStore((state: State) => state.flow.setEdgeLabel);
    const setEdgeType = useStore((state: State) => state.flow.setEdgeEdgeDataDescription);

    const [showLabel, setShowLabel] = useState<boolean>(false);

    let startAdornment: React.JSX.Element | undefined = undefined
    if (props.showIcon) {
        startAdornment = <InputAdornment position="start">
            <ButtonToggle
                iconOff={<Description/>}
                iconOn={<LabelOnIcon/>}
                on={showLabel}
                onClick={() => setShowLabel(!showLabel)}
                placement={"top"}
                style={{width: props.iconSize, height: props.iconSize}}
                tooltipOff={"Description"}
                tooltipOn={"Label"}
            />
        </InputAdornment>;
    }

    let textField: React.JSX.Element = <EdgeDefaultLabelTextField
        startAdornment={startAdornment}
        onChange={(value: string) => setEdgeType(props.id, value)}
        style={{
            backgroundColor: theme.palette.primary.main,
            width: props.rowWidth,
        }}
        value={props.description}
    />
    if (showLabel) {
        textField = <EdgeDefaultLabelTextField
            startAdornment={startAdornment}
            onChange={(value: string) => setEdgeLabel(props.id, value)}
            style={{
                backgroundColor: theme.palette.primary.main,
                width: props.rowWidth,
            }}
            value={props.label}
        />;
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
