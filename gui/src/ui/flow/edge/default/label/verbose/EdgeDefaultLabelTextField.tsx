import { InputProps, SxProps, TextField, Theme, useTheme } from "@mui/material";
import React from "react";

interface Props {
    onBlur?: () => void,
    onChange: (value: string) => void,
    placeholder: string,
    startAdornment?: React.JSX.Element,
    value: string,
    width: number,
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
                width: props.width,
            }}
            value={props.value}
        />
    )
}