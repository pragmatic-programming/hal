import React from "react";
import { createTheme, Palette, PaletteMode, ThemeProvider } from "@mui/material";
import { useStore } from "../Store";
import { State } from "../State";

interface Props {
    children: React.JSX.Element[];
}

// Augment the palette to include custom colors
declare module "@mui/material/styles" {
    interface Palette {
        // todo better name
        edge: Palette["primary"];
    }
}

function theme(mode: PaletteMode) {
    let palette: Partial<Palette> = {
        background: {
            default: "#ffffff",
            paper: "#eeeeee"
        },
        edge: {
            main: "#000000",
            light: "#000000",
            dark: "#000000",
            contrastText: "#000000"
        }
    };
    if (mode === "dark") {
        palette = {
            background: {
                default: "#1e1e1e",
                paper: "#262626"
            },
            edge: {
                main: "#ffffff",
                light: "#ffffff",
                dark: "#ffffff",
                contrastText: "#ffffff"
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
