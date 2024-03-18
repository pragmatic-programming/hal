import React, { CSSProperties } from "react";
import { SvgIcon } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import ButtonIconTooltip from "./ButtonIconTooltip";
import { Placement } from "./Placement";

interface Props {
    disabled?: boolean;
    icon: SvgIconComponent;
    onClick?: () => void;
    placement?: Placement;
    style?: CSSProperties;
    tooltip: string;
}

export function ButtonIconStatic(props: Props): React.JSX.Element {
    return (
        <ButtonIconTooltip
            disabled={props.disabled}
            onClick={props.onClick}
            placement={props.placement === undefined ? "top" : props.placement}
            style={props.style}
            title={props.tooltip}
        >
            <SvgIcon component={props.icon}></SvgIcon>
        </ButtonIconTooltip>
    );
}
