import { InputProps, styled, TextField } from "@mui/material";
import React, { CSSProperties } from "react";

// todo why not as regular styles?
const EdgeDefaultLabelTextFieldStyled = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        padding: 0,
        "& fieldset": {
            border: "none",
        }
    },
    "& .MuiInputAdornment-root": {
        marginRight: 0,
    },
});

interface Props {
    onBlur?: () => void,
    onChange: (value: string) => void,
    startAdornment?: React.JSX.Element,
    style: CSSProperties,
    value: string,
}

export function EdgeDefaultLabelTextField(props: Props): React.JSX.Element {
    const labelAndPriorityInputProps: Partial<InputProps> = {
        inputProps: {
            style: {
                textAlign: "center",
                paddingLeft: 4,
                paddingRight: 4,
            }
        },
        startAdornment: props.startAdornment,
    };
    return <EdgeDefaultLabelTextFieldStyled
        InputProps={labelAndPriorityInputProps}
        onBlur={props.onBlur}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)}
        size="small"
        style={props.style}
        value={props.value}
    />
}