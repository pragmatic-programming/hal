import React from "react";
import { State } from "../../../state/State";
import { useStore } from "../../../state/Store";
import { Divider, Drawer, List, ListSubheader } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import BoltIcon from "@mui/icons-material/Bolt";
import RedoIcon from "@mui/icons-material/Redo";
import CallMadeIcon from "@mui/icons-material/CallMade";
import MovingIcon from "@mui/icons-material/Moving";
import MenuLayoutsButtonLayout from "./MenuLayoutsButtonLayout";
import MenuLayoutsButtonEdgePathStyle from "./MenuLayoutsButtonEdgePathStyle";
import MenuButtonLayout from "../MenuButtonLayout";

const menuLayoutsWidth: number = 200;

export default function MenuLayouts(): React.JSX.Element {
    const open: boolean = useStore((state: State) => state.ui.layouts.open);
    const menuOpenToggle = useStore((state: State) => state.ui.layouts.layoutsOpenToggle);
    return (
        <>
            <MenuButtonLayout/>
            <Drawer
                anchor={"left"}
                open={open}
                onClose={menuOpenToggle}
            >
                <List
                    style={{
                        width: menuLayoutsWidth
                    }}
                    subheader={
                        <ListSubheader>Layout Settings</ListSubheader>
                    }
                >
                    <Divider/>
                    <MenuLayoutsButtonLayout
                        icon={<MoreVertIcon/>}
                        layoutOption={"vertical"}
                    />
                    <MenuLayoutsButtonLayout
                        icon={<MoreHorizIcon/>}
                        layoutOption={"horizontal"}
                    />
                    <MenuLayoutsButtonLayout
                        icon={<DataUsageIcon/>}
                        layoutOption={"radial"}
                    />
                    <MenuLayoutsButtonLayout
                        icon={<BoltIcon/>}
                        layoutOption={"force"}
                    />
                </List>
                <List
                    style={{
                        width: menuLayoutsWidth
                    }}
                    subheader={
                        <ListSubheader>Edge Settings</ListSubheader>
                    }
                >
                    <Divider/>
                    <MenuLayoutsButtonEdgePathStyle
                        edgePathStyle={"Bezier"}
                        icon={<RedoIcon/>}
                    />
                    <MenuLayoutsButtonEdgePathStyle
                        edgePathStyle={"Straight"}
                        icon={<CallMadeIcon/>}
                    />
                    <MenuLayoutsButtonEdgePathStyle
                        edgePathStyle={"Smooth"}
                        icon={<MovingIcon/>}
                    />
                </List>
            </Drawer>
        </>
    );
}
