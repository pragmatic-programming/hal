import React from "react";
import TooltipIconButton from "../util/TooltipIconButton";
import MenuButtonBox from "./MenuButtonBox";

interface Props {
    disabled?: boolean;
    on: boolean;
    iconOn: React.JSX.Element;
    iconOff: React.JSX.Element;
    onClick: () => void;
    tooltip: string;
}

export default function MenuButtonToggle(props: Props): React.JSX.Element {
    return (
        <MenuButtonBox>
            <TooltipIconButton
                disabled={props.disabled}
                onClick={props.onClick}
                placement={"right"}
                size="large"
                title={props.tooltip}
            >
                {props.on ? props.iconOn : props.iconOff}
            </TooltipIconButton>
        </MenuButtonBox>
    );
}
