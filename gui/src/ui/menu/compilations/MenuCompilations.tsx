import React from "react";
import { State } from "../../../state/State";
import { useStore } from "../../../state/Store";
import {
    Divider,
    Drawer,
    List,
    ListSubheader,
} from "@mui/material";
import { Director } from "../../../processors/directors/Director";
import { directors } from "../../../processors/directors/directors";
import { MenuCompilationsButtonDirector } from "./MenuCompilationsButtonDirector";
import MenuButtonPlay from "../MenuButtonPlay";
import { MenuCompilationsButtonShowHALProcessor } from "./MenuCompilationsButtonShowHALProcessor";

const menuCompilationsWidth: number = 350;

export default function MenuCompilations(): React.JSX.Element {
    const open: boolean = useStore((state: State) => state.ui.compilations.open);
    const menuOpenToggle = useStore((state: State) => state.ui.compilations.compilationsOpenToggle);
    return (
        <>
            <MenuButtonPlay/>
            <Drawer
                anchor={"left"}
                open={open}
                onClose={menuOpenToggle}
            >
                <List
                    style={{
                        width: menuCompilationsWidth
                    }}
                    subheader={
                        <ListSubheader>Compilation Directors</ListSubheader>
                    }
                >
                    <Divider/>
                    {directors
                        .map((director: Director) =>
                          <MenuCompilationsButtonDirector
                            icon={director.icon}
                            id={director.id}
                            key={director.id}
                            name={director.name}
                            processor={director.processor}
                          />
                        )}
                </List>
                <List
                    style={{
                        width: menuCompilationsWidth
                    }}
                    subheader={
                        <ListSubheader>Compilation Options</ListSubheader>
                    }
                >
                    <Divider/>
                    <MenuCompilationsButtonShowHALProcessor/>
                </List>
            </Drawer>
        </>
    );
}
