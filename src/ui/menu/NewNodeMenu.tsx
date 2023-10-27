import DoneIcon from "@mui/icons-material/Done";
import { InsertDriveFile } from "@mui/icons-material";
import React, { CSSProperties } from "react";
import { Box, Drawer, List, ListSubheader, Theme, useTheme } from "@mui/material";
import AddEditorButton from "./AddEditorButton";
import { State } from "../../state/State";
import { useStore } from "../../state/Store";

export default function NewNodeMenu(): React.JSX.Element {
    const theme: Theme = useTheme();
    const drawerOpen = useStore((state: State) => state.drawerOpen);
    const toggleDrawer = useStore((state: State) => state.toggleDrawer);
    const style: CSSProperties = {
        backgroundColor: theme.palette.gui.menu.background,
    };
    return (
        <Drawer
            PaperProps={{style: style}}
            anchor={"left"}
            onClose={toggleDrawer}
            open={drawerOpen}
        >
            <Box
                style={{width: 250}}
            >
                <List
                    component="nav"
                    subheader={
                        <ListSubheader
                            component="div"
                            style={style}
                        >
                            New Node
                        </ListSubheader>
                    }
                >
                    <AddEditorButton
                        type="editorNode"
                        text="Editor"
                        icon={<InsertDriveFile/>}
                    />
                    <AddEditorButton
                        type="resultNode"
                        text="Result"
                        icon={<DoneIcon/>}
                    />
                </List>
            </Box>
        </Drawer>
    );
}
