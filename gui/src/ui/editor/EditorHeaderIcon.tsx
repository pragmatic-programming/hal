import React, { useState } from "react";
import { IconButton, SvgIcon } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface Props {
    iconDefault: SvgIconComponent;
    iconHover?: SvgIconComponent;
    onClick?: () => void;
}

export function EditorHeaderIcon(props: Props): React.JSX.Element {
    const [inputValue, setInputValue] = useState<SvgIconComponent>(props.iconDefault);

    return (
        <IconButton
            onClick={props.onClick}
            onMouseEnter={() => setInputValue(props.iconHover ? props.iconHover : props.iconDefault)}
            onMouseLeave={() => setInputValue(props.iconDefault)}
            style={{
                marginRight: 5,
                marginLeft: 5,
            }}
        >
            <SvgIcon component={inputValue}></SvgIcon>
        </IconButton>
    );
}
