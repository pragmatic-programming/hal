import React from "react";
import { IconButton, Stack } from "@mui/material";
import { Loop } from "@mui/icons-material";
import { useStore } from "../Store";
import { State } from "../State";

export default function BottomRight(): React.JSX.Element {
    const rotate: boolean = useStore((state: State) => !state.locked);
    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent={"flex-end"}
        >
            <IconButton>
                <Loop
                    className={rotate ? "rotate" : "still"}
                    color={"action"}
                    style={{fontSize: 20}}
                />
            </IconButton>
        </Stack>
    );
}
