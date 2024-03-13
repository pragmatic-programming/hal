import { styled, TextField } from "@mui/material";

export const EdgeDefaultLabelTextField = styled(TextField)({
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
