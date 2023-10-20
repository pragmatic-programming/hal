import React from "react";
import { useStore } from "../../Store";
import { State } from "../../State";
import MenuButton from "./MenuButton";
import { AddBox } from "@mui/icons-material";

interface Props {
    type: string;
    tooltip: string;
}

export default function AddEditorButton(props: Props): React.JSX.Element {
    const addEditor = useStore((state: State) => state.onNodesChange);
    const nextId = useStore(
        (state: State) => Math.max(
            ...state.nodes.map(node => Number(node.id)), 0
        ) + 1
    );
    return (
        <MenuButton
            onClick={
                () => {
                    addEditor(
                        [{
                            type: "add",
                            item: {
                                id: nextId.toString(),
                                type: props.type,
                                data: {value: ""},
                                position: {x: 100, y: 125},
                            },
                        }]);
                }
            }
            icon={<AddBox fontSize="inherit"/>}
            tooltip={props.tooltip}
        />
    );
}
