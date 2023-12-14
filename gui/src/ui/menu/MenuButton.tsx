import React from "react";
import TooltipIconButton from "../util/TooltipIconButton";
import MenuButtonBox from "./MenuButtonBox";

interface Props {
    disabled?: boolean;
    icon: React.JSX.Element;
    onClick: () => void;
    tooltip: string;
}

export default function MenuButton(props: Props): React.JSX.Element {
    return (
        <MenuButtonBox>
            <TooltipIconButton
                disabled={props.disabled}
                onClick={props.onClick}
                placement={"right"}
                size="large"
                title={props.tooltip}
            >
                {props.icon}
            </TooltipIconButton>
        </MenuButtonBox>
    );
}
