import React from "react";
import ButtonIconTooltip from "./ButtonIconTooltip";
import { Placement } from "./Placement";

export interface Step {
    tooltip: string;
    icon: React.JSX.Element;
}

interface Props {
    steps: Step[];
    step: number;
    onClick: () => void;
    placement: Placement;
    size: "small" | "medium" | "large";
}

export default function ButtonSteps(props: Props): React.JSX.Element {
    const step: Step = props.steps[props.step];
    return (
        <ButtonIconTooltip
            onClick={props.onClick}
            placement={props.placement}
            size={props.size}
            title={step.tooltip}
        >
            {step.icon}
        </ButtonIconTooltip>
    );
}
