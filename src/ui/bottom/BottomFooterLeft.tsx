import React from "react";
import { Stack, Typography } from "@mui/material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export default function BottomFooterLeft(): React.JSX.Element {
    const projectName: string = useStore((state: State) => state.ui.projectName);
    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent={"flex-start"}
            style={{marginLeft: 8}} // icon in BottomFooterRight has a native paddingRight of 8px
        >
            <Typography variant="caption">Project: {projectName}</Typography>
        </Stack>

    );
}
