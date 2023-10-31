import {
    Box,
    Dialog,
    Divider,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Theme,
    Typography,
    useTheme
} from "@mui/material";
import React from "react";
import { Close, InsertDriveFile } from "@mui/icons-material";
import { useStore } from "../state/Store";
import { State } from "../state/State";
import DoneIcon from "@mui/icons-material/Done";
import { useReactFlow } from "reactflow";
import { NewDialogOpenState } from "../state/substates/NewDialogOpenState";

interface Props {
    newNodeDialogOpen: NewDialogOpenState;
}


export default function NewNodeDialog(props: Props): React.JSX.Element {
    const setNodeType = useStore((state: State) => state.setNodeType);
    const {getNode} = useReactFlow();
    const openNewDialog = useStore((state: State) => state.openNewNodeDialog);
    const node = getNode(props.newNodeDialogOpen.nodeId);
    const theme: Theme = useTheme();
    if (!node) {
        throw new Error("Node is undefined");
    }
    return (
        <Dialog
            fullScreen
            open={true}
        >
            <Box
                sx={{
                    alignItems: "center",
                    backgroundColor: theme.palette.primary.main,
                    borderBottom: "1px solid " + theme.palette.primary.dark,
                    display: "flex",
                    pr: 2,
                    pl: 1,
                    pt: .5,
                }}
            >
                <Typography sx={{ml: 2, flex: 1}} variant="body1" component="div">
                    New Node
                </Typography>
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="close"
                    onClick={() => openNewDialog(undefined)}
                >
                    <Close/>
                </IconButton>
            </Box>
            <List>
                <ListItemButton
                    onClick={() => setNodeType(props.newNodeDialogOpen.nodeId, "editor")}
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
                    onClick={() => setNodeType(props.newNodeDialogOpen.nodeId, "result")}
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
