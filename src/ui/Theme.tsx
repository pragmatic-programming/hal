import React from "react";
import { createTheme, Palette, PaletteMode, ThemeProvider } from "@mui/material";
import { useStore } from "../state/Store";
import { State } from "../state/State";

interface Props {
    children: React.JSX.Element[] | React.JSX.Element;
}

// Augment the palette to include custom colors
declare module "@mui/material/styles" {
    interface Palette {
        gui: {
            menu: {
                background: string,
                border: string
            },
            bottom: {
                background: string,
            },
            canvas: {
                background: string,
            }
        };
    }
}

function theme(mode: PaletteMode) {
    let palette: Partial<Palette> = {
        primary: {
            main: "rgba(0, 0, 0, 0.87)",
            light: "rgba(0, 0, 0, 0.87)",
            dark: "rgba(0, 0, 0, 0.87)",
            contrastText: "rgba(0, 0, 0, 0.87)",
        },
        gui: {
            menu: {
                background: "#eeeeee",
                border: "#dcdcdc",
            },
            bottom: {
                background: "#f0f0f0"
            },
            canvas: {
                background: "#f5f5f5"
            }
        }
    };
    if (mode === "dark") {
        palette = {
            gui: {
                menu: {
                    background: "#1e1e1e",
                    border: "#262626",
                },
                bottom: {
                    background: "#f0f0f0"
                },
                canvas: {
                    background: "#f5f5f5"
                }
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
