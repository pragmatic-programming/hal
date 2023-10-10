import React, { useState } from "react";
import { Canvas } from "../model/Canvas";
import "./Renderer.scss";
import Menu from "../ui/Menu";
import Main from "../ui/Main";
import { createTheme, ThemeProvider } from "@mui/material";
import Bottom from "../ui/Bottom";

interface Props {
    canvas: Canvas;
}

export default function Renderer(props: Props): JSX.Element {
    const [canvas, setItems] = useState(props.canvas);
    const menuWidth = 100;

    const theme = createTheme({
        palette: {
            primary: {
                light: "#757ce8",
                main: "#3f50b5",
                dark: "#002884",
                contrastText: "#fff",
            },
            secondary: {
                light: "#ffffff",
                main: "#ffffff",
                dark: "#ba000d",
                contrastText: "#000",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Main menuWidth={menuWidth} canvas={canvas}></Main>
            <Bottom menuWidth={menuWidth}></Bottom>
            <Menu menuWidth={menuWidth} newEditor={editor => setItems(canvas.addEditor(editor))}></Menu>
        </ThemeProvider>
    );
}
