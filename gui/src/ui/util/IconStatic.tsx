import React, { CSSProperties } from "react";
import { SvgIcon } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";
import TooltipIconButton from "./TooltipIconButton";

interface Props {
    icon: SvgIconComponent;
    onClick?: () => void;
    style?: CSSProperties;
    tooltip: string;
}

export function IconStatic(props: Props): React.JSX.Element {
    return (
        <TooltipIconButton
            onClick={props.onClick}
            placement="top"
            style={props.style}
            title={props.tooltip}
        >
            <SvgIcon component={props.icon}></SvgIcon>
        </TooltipIconButton>
    );
}
