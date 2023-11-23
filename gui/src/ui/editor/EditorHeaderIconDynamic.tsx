import React, { CSSProperties, useState } from "react";
import { IconButton, SvgIcon } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface Props {
    iconDefault: SvgIconComponent;
    iconHover: SvgIconComponent;
    onClick: () => void;
    style: CSSProperties;
}

export function EditorHeaderIconDynamic(props: Props): React.JSX.Element {
    const [inputValue, setInputValue] = useState<SvgIconComponent>(props.iconDefault);

    return (
        <IconButton
            onClick={props.onClick}
            onMouseEnter={() => setInputValue(props.iconHover ? props.iconHover : props.iconDefault)}
            onMouseLeave={() => setInputValue(props.iconDefault)}
            style={props.style}
        >
            <SvgIcon component={inputValue}></SvgIcon>
        </IconButton>
    );
}
