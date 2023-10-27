import React from "react";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useReactFlow } from "reactflow";

interface Props {
    type: string;
    text: string;
    icon: React.JSX.Element;
}

export default function AddEditorButton(props: Props): React.JSX.Element {
    const addEditor = useStore((state: State) => state.onNodesChange);
    const layout = useStore((state: State) => state.layout);
    const toggleDrawer = useStore((state: State) => state.toggleDrawer);
    const {getNode, fitView} = useReactFlow();
    const nextId = useStore(
        (state: State) => Math.max(
            ...state.nodes.map(node => Number(node.id)), 0
        ) + 1
    );
    return (
        <ListItemButton
            sx={{pl: 4}}
            onClick={
                () => {
                    addEditor(
                        [{
                            type: "add",
                            item: {
                                id: nextId.toString(),
                                type: props.type,
                                data: {value: ""},
                                position: {x: 0, y: 0},
                            },
                        }]);
                    toggleDrawer();
                    layout(getNode, fitView);
                }
            }
        >
            <ListItemIcon>
                {props.icon}
            </ListItemIcon>
            <ListItemText primary={props.text}/>
        </ListItemButton>
    );
}
