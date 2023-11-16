import { styled, TextField } from "@mui/material";

export const EdgeDefaultLabelTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none"
        }
    },
});
