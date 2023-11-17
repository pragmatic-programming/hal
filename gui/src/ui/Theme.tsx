import React from "react";
import { createTheme, Palette, ThemeProvider } from "@mui/material";

interface Props {
    children: React.JSX.Element[] | React.JSX.Element;
}


function theme() {
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
            contrastText: "rgba(0, 0, 0, 0.87)",
        },
        success: {
            light: "#B0D9B1",
            main: "#2e7d32",
            dark: "#618264",
            contrastText: "rgba(0, 0, 0, 0.87)",
        },
        error: {
            light: "#ec7674",
            main: "#d32f2f",
            dark: "#c62828",
            contrastText: "rgba(0, 0, 0, 0.87)",
        }
    };
    return createTheme({
        palette: {
            ...palette,
            mode: "light",
        },
    });
}

export default function Theme(props: Props): React.JSX.Element {
    return (
        <ThemeProvider theme={React.useMemo(() => theme(), [])}>
            {props.children}
        </ThemeProvider>
    );
}
