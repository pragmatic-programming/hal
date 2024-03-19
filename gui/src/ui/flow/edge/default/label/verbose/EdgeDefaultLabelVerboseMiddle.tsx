import React, { useState } from "react";
import { InputAdornment, Stack } from "@mui/material";
import ButtonToggle from "../../../../../util/ButtonToggle";
import Description from "@mui/icons-material/Description";
import LabelOnIcon from "@mui/icons-material/Label";
import EdgeDefaultLabelVerboseMiddleTextField from "./EdgeDefaultLabelVerboseMiddleTextField";
import { edgeDefaultLabelVerboseIconSize } from "./EdgeDefaultLabelVerbose";

interface Props {
    description: string,
    id: string,
    label: string,
    rowWidth: number,
    showIcon: boolean,
}


export default function EdgeDefaultLabelVerboseMiddle(props: Props): React.JSX.Element {
    const [showLabel, setShowLabel] = useState<boolean>(true);
    let startAdornment: React.JSX.Element | undefined = undefined
    if (props.showIcon) {
        startAdornment = (
            <InputAdornment position="start">
            <ButtonToggle
                iconOff={<Description/>}
                iconOn={<LabelOnIcon/>}
                on={showLabel}
                onClick={() => setShowLabel(!showLabel)}
                placement={"top"}
                size={"medium"}
                style={{width: edgeDefaultLabelVerboseIconSize, height: edgeDefaultLabelVerboseIconSize}}
                tooltipOff={"Show Label"}
                tooltipOn={"Show Description"}
            />
            </InputAdornment>
        )
    }

    return (
        <Stack
            style={{
                width: props.rowWidth,
            }}
        >
            <EdgeDefaultLabelVerboseMiddleTextField
                description={props.description}
                id={props.id}
                label={props.label}
                rowWidth={props.rowWidth}
                showLabel={showLabel}
                startAdornment={startAdornment}
            />
        </Stack>
    );

}
