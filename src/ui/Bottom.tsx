import React from "react";
import { IconButton, Stack, Theme, useTheme } from "@mui/material";
import { Loop } from "@mui/icons-material";
import { useStore } from "../Store";
import { State } from "../State";
import "./Bottom.scss";

export default function Bottom(): React.JSX.Element {
    const theme: Theme = useTheme();
    // reduce bottomHeight by 4px, since paddingBottom and paddingTop will add 2px each
    const bottomHeight: number = useStore((state: State) => state.bottomHeight - 4);
    const rotate: boolean = useStore((state: State) => !state.locked);
    return (
        <div
            style={{
                backgroundColor: theme.palette.gui.bottom.background,
                borderTop: "1px solid " + theme.palette.gui.menu.border,
                left: 0,
                bottom: 0,
                height: bottomHeight,
                paddingBottom: 2,
                paddingTop: 2,
                position: "fixed",
                width: "100vw",
            }}
        >
            <Stack
                direction="row"
                spacing={1}
                alignItems={"center"}
                justifyContent={"end"}
                style={{
                    height: bottomHeight,
                    paddingRight: 5,
                }}
            >
                <IconButton>
                    <Loop
                        className={rotate ? "rotate" : "still"}
                        color={"action"}
                        style={{display: "inline-block", fontSize: 20}}
                    />
                </IconButton>
            </Stack>
        </div>
    );
}
