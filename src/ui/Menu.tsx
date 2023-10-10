import React, { CSSProperties } from "react";
import { Position } from "../model/Position";
import { Dimension } from "../model/Dimension";
import { Editor } from "../model/Editor";
import { IconButton } from "@mui/material";
import { AddBox } from "@mui/icons-material";

interface Props {
    menuWidth: number;
    newEditor: (editor: Editor) => void;
}

export default function Menu(props: Props): JSX.Element {
    let style: CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: props.menuWidth,
        height: "100vh",
        backgroundColor: "#262626",
        borderRight: "1px solid #363636"
    };
    return (
        <div style={style}>
            <br/>
            <center>
                <IconButton
                    onClick={
                        () => {
                            props.newEditor(
                                new Editor(
                                    3,
                                    new Dimension(640, 480),
                                    new Position(0, 0),
                                    "javascript",
                                    "alert('Hello '+ x)"
                                )
                            );
                        }
                    }
                    size="large"
                    color="secondary"
                >
                    <AddBox fontSize="inherit"></AddBox>
                </IconButton>
            </center>
        </div>
    );
}
