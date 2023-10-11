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
        edge: {
            main: "#000000",
            light: "#000000",
            dark: "#000000",
            contrastText: "#000000"
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
            edge: {
                main: "#ffffff",
                light: "#ffffff",
                dark: "#ffffff",
                contrastText: "#ffffff"
            },
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
