import React, { CSSProperties, MutableRefObject } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Placement } from "./Placement";

interface Props {
    children: React.JSX.Element;
    disabled?: boolean;
    onClick?: () => void;
    placement?: Placement;
    buttonRef?: MutableRefObject<null>;
    size: "small" | "medium" | "large";
    style?: CSSProperties;
    sx?: CSSProperties;
    title: string;
}

export default function ButtonIconTooltip(props: Props): React.JSX.Element {
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
