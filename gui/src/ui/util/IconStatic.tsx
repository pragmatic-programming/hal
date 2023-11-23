import React, { CSSProperties } from "react";
import { IconButton, SvgIcon } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface Props {
    icon: SvgIconComponent;
    onClick?: () => void;
    style?: CSSProperties;
}

export function IconStatic(props: Props): React.JSX.Element {
    return (
        <IconButton
            onClick={props.onClick}
            style={props.style}
        >
            <SvgIcon component={props.icon}></SvgIcon>
        </IconButton>
    );
}
