import React, { CSSProperties } from "react";
import { SvgIcon } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import TooltipIconButton from "./TooltipIconButton";
import { Placement } from "./Placement";

interface Props {
    disabled?: boolean;
    icon: SvgIconComponent;
    onClick?: () => void;
    placement?: Placement;
    style?: CSSProperties;
    tooltip: string;
}

export function IconStatic(props: Props): React.JSX.Element {
    return (
        <TooltipIconButton
            disabled={props.disabled}
            onClick={props.onClick}
            placement={props.placement === undefined ? "top" : props.placement}
            style={props.style}
            title={props.tooltip}
        >
            <SvgIcon component={props.icon}></SvgIcon>
        </TooltipIconButton>
    );
}
