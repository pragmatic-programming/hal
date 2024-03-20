import React, { CSSProperties } from "react";
import ButtonIconTooltip from "./ButtonIconTooltip";
import { Placement } from "./Placement";

interface Props {
    disabled?: boolean;
    iconOff: React.JSX.Element;
    iconOn: React.JSX.Element;
    on: boolean;
    onClick: () => void;
    tooltipOff: string;
    placement: Placement;
    size: "small" | "medium" | "large";
    style?: CSSProperties,
    tooltipOn: string;
}

export default function ButtonToggle(props: Props): React.JSX.Element {
    return (
        <ButtonIconTooltip
            disabled={props.disabled}
            onClick={props.onClick}
            placement={props.placement}
            size={props.size}
            style={props.style}
            title={props.on ? props.tooltipOn : props.tooltipOff}
        >
            {props.on ? props.iconOn : props.iconOff}
        </ButtonIconTooltip>
    );
}
