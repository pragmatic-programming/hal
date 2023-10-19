import React from "react";
import { useStore } from "../../Store";
import { State } from "../../State";
import MenuButton from "./MenuButton";
import { AddBox } from "@mui/icons-material";

export default function AddEditorButton(): React.JSX.Element {
    const addEditor = useStore((state: State) => state.onNodesChange);
    return (
        <MenuButton
            onClick={
                () => {
                    addEditor(
                        [{
                            type: "add",
                            item: {
                                id: "3",
                                type: "textUpdater",
                                data: {value: "x + 2"},
                                position: {x: 100, y: 125},
                            },
                        }]);
                }
            }
            icon={<AddBox fontSize="inherit"/>}
        />
    );
}
