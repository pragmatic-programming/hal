import React, { CSSProperties } from "react";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface Props {
    icon: SvgIconComponent;
    onClick?: () => void;
    style?: CSSProperties;
    tooltip: string;
}

export function IconStatic(props: Props): React.JSX.Element {
    return (
        <Tooltip
            placement="top"
            title={props.tooltip}
        >
            <IconButton
                onClick={props.onClick}
                style={props.style}
            >
                <SvgIcon component={props.icon}></SvgIcon>
            </IconButton>
        </Tooltip>
    );
}
