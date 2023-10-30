import {
    AppBar,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import React from "react";
import { Close, InsertDriveFile } from "@mui/icons-material";
import { useStore } from "../state/Store";
import { State } from "../state/State";
import DoneIcon from "@mui/icons-material/Done";
import { useReactFlow } from "reactflow";
import { DrawerState } from "../state/substates/DrawerState";

interface Props {
    drawerOpen: DrawerState;
}


export default function NewNodeDialog(props: Props): React.JSX.Element {
    const setNodeType = useStore((state: State) => state.setNodeType);
    const {getNode} = useReactFlow();
    const toggleDrawer = useStore((state: State) => state.toggleDrawer);
    const node = getNode(props.drawerOpen.nodeId);
    if (!node) {
        throw new Error("Node is undefined");
    }
    return (
        <Dialog
            fullScreen
            open={true}
        >
            <AppBar sx={{position: "relative"}}>
                <Toolbar>
                    <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
                        New Node
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                        aria-label="close"
                        onClick={() => toggleDrawer(undefined)}
                    >
                        <Close/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <List>
                <ListItemButton
                    onClick={() => setNodeType(props.drawerOpen.nodeId, "editorNode")}
                >
                    <ListItemIcon>
                        <InsertDriveFile/>
                    </ListItemIcon>
                    <ListItemText
                        primary="Editor Node"
                    />
                </ListItemButton>
                <Divider/>
                <ListItemButton
                    onClick={() => setNodeType(props.drawerOpen.nodeId, "resultNode")}
                >
                    <ListItemIcon>
                        <DoneIcon/>
                    </ListItemIcon>
                    <ListItemText
                        primary="Result Node"
                    />
                </ListItemButton>
            </List>
        </Dialog>
    );
}
