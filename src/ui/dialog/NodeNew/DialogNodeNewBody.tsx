import { Divider, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { InsertDriveFile } from "@mui/icons-material";
import DoneIcon from "@mui/icons-material/Done";
import React from "react";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";

interface Props {
    nodeId: string;
}

export function DialogNodeNewBody(props: Props): React.JSX.Element {
    const setNodeType = useStore((state: State) => state.reactFlow.setNodeType);
    return (
        <List>
            <ListItemButton
                onClick={() => setNodeType(props.nodeId, "editor")}
            >
                <ListItemIcon>
                    <InsertDriveFile/>
                </ListItemIcon>
                <ListItemText
                    primary="Editor"
                />
            </ListItemButton>
            <Divider/>
            <ListItemButton
                onClick={() => setNodeType(props.nodeId, "result")}
            >
                <ListItemIcon>
                    <DoneIcon/>
                </ListItemIcon>
                <ListItemText
                    primary="Result"
                />
            </ListItemButton>
        </List>
    );
}
