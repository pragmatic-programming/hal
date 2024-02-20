import React from "react";
import TooltipIconButton from "../util/TooltipIconButton";
import MenuButtonBox from "./MenuButtonBox";

interface Props {
    disabled?: boolean;
    iconOff: React.JSX.Element;
    iconOn: React.JSX.Element;
    on: boolean;
    onClick: () => void;
    tooltipOff: string;
    tooltipOn: string;
}

export default function MenuButtonToggle(props: Props): React.JSX.Element {
    return (
        <MenuButtonBox>
            <TooltipIconButton
                disabled={props.disabled}
                onClick={props.onClick}
                placement={"right"}
                size="large"
                title={props.on ? props.tooltipOn : props.tooltipOff}
            >
                {props.on ? props.iconOn : props.iconOff}
            </TooltipIconButton>
        </MenuButtonBox>
    );
}
