import React from "react";
import { createTheme, Palette, PaletteMode, ThemeProvider } from "@mui/material";
import { useStore } from "../Store";
import { State } from "../State";

interface Props {
    children: React.JSX.Element[];
}

function theme(mode: PaletteMode) {
    let palette: Partial<Palette> = {
        background: {
            default: "#ffffff",
            paper: "#eeeeee"
        }
    };
    if (mode === "dark") {
        palette = {
            background: {
                default: "#1e1e1e",
                paper: "#262626"
            }
        };
    }
    return createTheme({
        palette: {
            ...palette,
            mode: mode,
        },
    });
}

export default function Theme(props: Props): React.JSX.Element {
    const mode: PaletteMode = useStore((state: State) => state.mode);
    return (
        <ThemeProvider theme={React.useMemo(() => theme(mode), [mode])}>
            {props.children}
        </ThemeProvider>
    );
}
