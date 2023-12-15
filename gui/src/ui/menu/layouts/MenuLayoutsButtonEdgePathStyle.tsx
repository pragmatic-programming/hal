import React from "react";
import { State } from "../../../state/State";
import { useStore } from "../../../state/Store";
import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { firstCharUpperCase } from "../../../util";
import { EdgePathStyle } from "../../../model/edge/EdgePathStyle";

interface Props {
    edgePathStyle: EdgePathStyle;
    icon: React.JSX.Element;
}

export default function MenuLayoutsButtonEdgePathStyle(props: Props): React.JSX.Element {
    const setEdgePathStyle = useStore((state: State) => state.flow.setEdgePathStyleForAll);
    return (
        <ListItem>
            <ListItemButton
                onClick={() => setEdgePathStyle(props.edgePathStyle)}
            >
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                {firstCharUpperCase(props.edgePathStyle)}
            </ListItemButton>
        </ListItem>
    );
}
