import React, { useState } from "react";
import { InputAdornment } from "@mui/material";
import ButtonToggle from "../../../../util/ButtonToggle";
import Description from "@mui/icons-material/Description";
import LabelOnIcon from "@mui/icons-material/Label";
import EdgeDefaultLabelTextFieldLabelOrDescription from "./EdgeDefaultLabelTextFieldLabelOrDescription";
import { edgeDefaultLabelVerboseIconSize } from "./verbose/EdgeDefaultLabelVerbose";

interface Props {
    description: string,
    id: string,
    label: string,
    showIcon: boolean,
}


export default function EdgeDefaultLabelTextFieldLabelOrDescriptionWithIcon(props: Props): React.JSX.Element {
    const [showLabel, setShowLabel] = useState<boolean>(true);
    let startAdornment: React.JSX.Element | undefined = undefined;
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
        );
    }

    return (
        <EdgeDefaultLabelTextFieldLabelOrDescription
            description={props.description}
            id={props.id}
            label={props.label}
            showLabel={showLabel}
            startAdornment={startAdornment}
        />
    );

}
