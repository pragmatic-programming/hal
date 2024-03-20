import { InputProps, SxProps, TextField, Theme, useTheme } from "@mui/material";
import React from "react";
import { edgeDefaultLabelVerboseIconSize } from "./verbose/EdgeDefaultLabelVerbose";

interface Props {
    onBlur?: () => void,
    onChange: (value: string) => void,
    placeholder: string,
    startAdornment?: React.JSX.Element,
    value: string,
    maxWidth?: number,
}

function calculateRowWidth(labelLength: number, showIcon: boolean): number {
    const minimumRowWidth: number = edgeDefaultLabelVerboseIconSize * 3;
    const characterPixelFactor: number = 12;
    const rowWidth: number = Math.max(
        minimumRowWidth,
        labelLength * characterPixelFactor
    );
    // if we want to show the icon we must add the iconSize to the rowWidth,
    // so that the overall label is still centered
    if (showIcon) {
        return rowWidth + edgeDefaultLabelVerboseIconSize;
    }
    return rowWidth;
}

export function EdgeDefaultLabelTextField(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    const inputProps: Partial<InputProps> = {
        inputProps: {
            style: {
                textAlign: "center",
                paddingLeft: 4,
                paddingRight: 4,
                border: "none",
            }
        },
        startAdornment: props.startAdornment,
    };
    // I am not sure if this is a good way to style nested components
    // see https://mui.com/material-ui/customization/how-to-customize/#overriding-nested-component-styles
    const sx: SxProps = {
        "& .MuiOutlinedInput-root": {
            padding: 0,
            "& fieldset": {
                border: "none",
            }
        },
        "& .MuiInputAdornment-root": {
            marginRight: 0,
        },
    };
    const showIcon: boolean = props.startAdornment !== undefined;
    let width: number = calculateRowWidth(props.value.length, showIcon);
    if (props.maxWidth) {
        width = Math.min(props.maxWidth, width);
    }
    return (
        <TextField
            InputProps={inputProps}
            onBlur={props.onBlur}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)}
            placeholder={props.placeholder}
            size={"small"}
            sx={sx}
            style={{
                backgroundColor: theme.palette.primary.main,
                width: width,
            }}
            value={props.value}
        />
    );
}
