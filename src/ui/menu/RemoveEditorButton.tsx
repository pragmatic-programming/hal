import React from "react";
import { useStore } from "../../Store";
import { State } from "../../State";
import MenuButton from "./MenuButton";
import { IndeterminateCheckBox } from "@mui/icons-material";

export default function RemoveEditorButton(): React.JSX.Element {
    const firstEditorIsNotSelected: boolean = useStore((state: State) => state.highlightedEditor.first === null);
    const removeEditor = useStore((state: State) => state.removeEditor);
    return (
        <MenuButton
            onClick={removeEditor}
            disabled={firstEditorIsNotSelected}
            icon={<IndeterminateCheckBox fontSize="inherit"/>}
        />
    );
}
