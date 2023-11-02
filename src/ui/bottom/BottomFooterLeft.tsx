import React from "react";
import { Stack, Typography } from "@mui/material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export default function BottomFooterLeft(): React.JSX.Element {
    const projectName: string = useStore((state: State) => state.projectName);
    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent={"flex-start"}
            // icon in BottomFooterRight has a native paddingRight of 8px
            style={{marginLeft: 8}}
        >
            <Typography variant="caption" color="secondary">Project: {projectName}</Typography>
        </Stack>

    );
}
