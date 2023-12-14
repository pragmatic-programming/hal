import React, { CSSProperties, MutableRefObject } from "react";
import { IconButton, Tooltip } from "@mui/material";

interface Props {
    children: React.JSX.Element;
    disabled?: boolean;
    onClick?: () => void;
    placement:
        | "bottom-end"
        | "bottom-start"
        | "bottom"
        | "left-end"
        | "left-start"
        | "left"
        | "right-end"
        | "right-start"
        | "right"
        | "top-end"
        | "top-start"
        | "top";
    buttonRef?: MutableRefObject<null>;
    size?: "large";
    style?: CSSProperties;
    sx?: CSSProperties;
    title: string;
}

export default function TooltipIconButton(props: Props): React.JSX.Element {
    const button: React.JSX.Element =
        <IconButton
            disabled={props.disabled}
            onClick={props.onClick}
            ref={props.buttonRef}
            size={props.size}
            style={props.style}
        >
            {props.children}
        </IconButton>;
    if (props.disabled) {
        return button;
    }
    return (
        <Tooltip
            placement={props.placement}
            title={props.title}
            sx={props.sx}
        >
            {button}
        </Tooltip>
    );
}
