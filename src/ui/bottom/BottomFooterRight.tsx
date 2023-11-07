import React from "react";
import { IconButton, Stack } from "@mui/material";
import { Loop } from "@mui/icons-material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export default function BottomFooterRight(): React.JSX.Element {
    const rotate: boolean = useStore((state: State) => state.ui.busy);
    return (
        <Stack
            direction="row"
            spacing={1}
            justifyContent={"flex-end"}
        >
            <IconButton>
                <Loop
                    className={rotate ? "rotate" : "still"}
                    style={{fontSize: 20}}
                />
            </IconButton>
        </Stack>
    );
}
