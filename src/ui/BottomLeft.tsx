import React from "react";
import { Stack, Typography } from "@mui/material";
import { useStore } from "../Store";
import { State } from "../State";
import { IHGraph } from "ihgraph";

export default function BottomLeft(): React.JSX.Element {
    const projectName: string = useStore((state: State) => state.project.name);
    const ihGraph: IHGraph | undefined = useStore((state: State) => state.ihgraph);
    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent={"flex-start"}
        >
            <Typography variant="caption">Project: {projectName}</Typography>
            <Typography variant="caption">{ihGraph ? ihGraph.getSourceNodes()[0].getId() : "foo"}</Typography>
        </Stack>

    );
}
