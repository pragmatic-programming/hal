import React from "react";
import { Stack, Typography } from "@mui/material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export default function BottomLeft(): React.JSX.Element {
    const projectName: string = useStore((state: State) => state.projectName);
    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent={"flex-start"}
        >
            <Typography variant="caption">Project: {projectName}</Typography>
        </Stack>

    );
}
