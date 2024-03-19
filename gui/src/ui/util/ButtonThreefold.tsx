import React, { CSSProperties } from "react";
import ButtonIconTooltip from "./ButtonIconTooltip";
import { Placement } from "./Placement";

interface Props {
    disabled?: boolean;
    iconStepOne: React.JSX.Element;
    iconStepTwo: React.JSX.Element;
    iconStepThree: React.JSX.Element;
    step: "one" | "two" | "three";
    onClick: () => void;
    tooltipStepOne: string;
    tooltipStepTwo: string;
    tooltipStepThree: string;
    placement: Placement;
    size: "small" | "medium" | "large";
    // todo
    style?: CSSProperties,
}

export default function ButtonThreefold(props: Props): React.JSX.Element {
    let tooltip = props.tooltipStepThree;
    let icon = props.iconStepThree;
    if (props.step === "one") {
        tooltip = props.tooltipStepOne;
        icon = props.iconStepOne;
    }
    if (props.step === "two") {
        tooltip = props.tooltipStepTwo;
        icon = props.iconStepTwo;
    }
    return (
        <ButtonIconTooltip
            disabled={props.disabled}
            onClick={props.onClick}
            placement={props.placement}
            size={props.size}
            style={props.style}
            title={tooltip}
        >
            {icon}
        </ButtonIconTooltip>
    );
}
