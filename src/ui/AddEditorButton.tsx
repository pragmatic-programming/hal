import React from "react";
import { useStore } from "../Store";
import { State } from "../State";
import MenuButton from "./MenuButton";
import { AddBox } from "@mui/icons-material";
import { Editor } from "../model/Editor";
import { Dimension } from "../model/Dimension";
import { Position } from "../model/Position";

export default function AddEditorButton(): React.JSX.Element {
    const addEditor = useStore((state: State) => state.addEditor);
    return (
        <MenuButton
            onClick={
                () => {
                    addEditor(
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
            icon={<AddBox fontSize="inherit"/>}
        />
    );
}
