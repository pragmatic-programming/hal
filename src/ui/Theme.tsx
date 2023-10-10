import React from "react";
import { createTheme, Palette, PaletteMode, ThemeProvider } from "@mui/material";

interface Props {
    children: React.JSX.Element[];
    mode: PaletteMode
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
    return (
        <ThemeProvider theme={React.useMemo(() => theme(props.mode), [props.mode])}>
            {props.children}
        </ThemeProvider>
    );
}
