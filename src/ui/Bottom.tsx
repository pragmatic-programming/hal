import React from "react";
import { Stack, Theme, useTheme } from "@mui/material";
import { useStore } from "../Store";
import { State } from "../State";
import "./Bottom.scss";
import BottomLeft from "./BottomLeft";
import BottomRight from "./BottomRight";

export default function Bottom(): React.JSX.Element {
    const theme: Theme = useTheme();
    // reduce bottomHeight by 4px, since paddingBottom and paddingTop will add 2px each
    const bottomHeight: number = useStore((state: State) => state.bottomHeight - 4);
    return (
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={0}
                style={{
                    backgroundColor: theme.palette.gui.bottom.background,
                    borderTop: "1px solid " + theme.palette.gui.menu.border,
                    bottom: 0,
                    height: bottomHeight,
                    left: 0,
                    paddingBottom: 2,
                    paddingLeft: 5,
                    paddingRight: 5,
                    paddingTop: 2,
                    position: "fixed",
                    width: "calc(100vw - " + 10 + "px)",
                }}
            >
                <BottomLeft/>
                <BottomRight/>
            </Stack>
    );
}
