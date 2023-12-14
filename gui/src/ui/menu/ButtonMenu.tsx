import React from "react";
import TooltipIconButton from "../util/TooltipIconButton";
import ButtonMenuBox from "./ButtonMenuBox";

interface Props {
    disabled?: boolean;
    icon: React.JSX.Element;
    onClick: () => void;
    tooltip: string;
}

export default function ButtonMenu(props: Props): React.JSX.Element {
    return (
        <ButtonMenuBox>
            <TooltipIconButton
                disabled={props.disabled}
                onClick={props.onClick}
                placement={"right"}
                size="large"
                title={props.tooltip}
            >
                {props.icon}
            </TooltipIconButton>
        </ButtonMenuBox>
    );
}
