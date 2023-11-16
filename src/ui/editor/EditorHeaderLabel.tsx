import { styled, TextField } from "@mui/material";

export const EditorHeaderLabel = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none"
        },
    },
});
