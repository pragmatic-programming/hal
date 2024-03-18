import React from "react";
import ButtonIconTooltip from "../util/ButtonIconTooltip";
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
            <ButtonIconTooltip
                disabled={props.disabled}
                onClick={props.onClick}
                placement={"right"}
                size={"large"}
                title={props.tooltip}
            >
                {props.icon}
            </ButtonIconTooltip>
        </MenuButtonBox>
    );
}
