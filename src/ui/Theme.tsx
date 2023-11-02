import React from "react";
import { createTheme, Palette, PaletteMode, ThemeProvider } from "@mui/material";
import { useStore } from "../state/Store";
import { State } from "../state/State";

interface Props {
    children: React.JSX.Element[] | React.JSX.Element;
}


function theme(mode: PaletteMode) {
    let palette: Partial<Palette> = {
        primary: {
            main: "#eeeeee",
            light: "#ffffff",
            dark: "#dcdcdc",
            contrastText: "rgba(0, 0, 0, 0.87)",
        },
        secondary: {
            main: "rgb(97, 97, 97)",
            light: "#f0f0f0",
            dark: "#dcdcdc",
            contrastText: "",
        }
    };
    if (mode === "dark") {
        palette = {
            secondary: {
                main: "#eeeeee",
                light: "#f0f0f0",
                dark: "#dcdcdc",
                contrastText: "rgba(0, 0, 0, 0.87)",
            },
            primary: {
                main: "rgba(0, 0, 0, 0.87)",
                light: "#f0f0f0",
                dark: "#dcdcdc",
                contrastText: "",
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
