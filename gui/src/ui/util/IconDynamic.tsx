import React, { CSSProperties, useState } from "react";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import { SvgIconComponent } from "@mui/icons-material";

interface Props {
    iconDefault: SvgIconComponent;
    iconHover: SvgIconComponent;
    onClick: () => void;
    style?: CSSProperties;
    tooltip: string;
}

export function IconDynamic(props: Props): React.JSX.Element {
    const [inputValue, setInputValue] = useState<SvgIconComponent>(props.iconDefault);

    return (
        <Tooltip
            placement="top"
            title={props.tooltip}
        >
            <IconButton
                onClick={props.onClick}
                onMouseEnter={() => setInputValue(props.iconHover ? props.iconHover : props.iconDefault)}
                onMouseLeave={() => setInputValue(props.iconDefault)}
                style={props.style}
            >
                <SvgIcon component={inputValue}></SvgIcon>
            </IconButton>
        </Tooltip>
    );
}
