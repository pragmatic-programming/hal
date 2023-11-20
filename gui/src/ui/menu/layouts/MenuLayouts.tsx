import React from "react";
import { State } from "../../../state/State";
import { useStore } from "../../../state/Store";
import { Drawer, List, ListSubheader } from "@mui/material";
import ButtonMenu from "../ButtonMenu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import BoltIcon from "@mui/icons-material/Bolt";
import RedoIcon from "@mui/icons-material/Redo";
import CallMadeIcon from "@mui/icons-material/CallMade";
import MovingIcon from "@mui/icons-material/Moving";
import MenuLayoutsButtonLayout from "./MenuLayoutsButtonLayout";
import MenuLayoutsButtonEdgePathStyle from "./MenuLayoutsButtonEdgePathStyle";
import { Polyline } from "@mui/icons-material";

const menuExamplesWidth: number = 200;

export default function MenuLayouts(): React.JSX.Element {
    const menuOpenToggle = useStore((state: State) => state.ui.layouts.layoutsOpenToggle);
    const open: boolean = useStore((state: State) => state.ui.layouts.open);
    return (
        <>
            <ButtonMenu
                icon={<Polyline/>}
                onClick={menuOpenToggle}
                tooltip={"Layout Settings"}
            />
            <Drawer
                anchor={"left"}
                open={open}
                onClose={menuOpenToggle}
            >
                <List
                    style={{
                        width: menuExamplesWidth
                    }}
                    subheader={
                        <ListSubheader>Layout Settings</ListSubheader>
                    }
                >
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
                        width: menuExamplesWidth
                    }}
                    subheader={
                        <ListSubheader>Edge Settings</ListSubheader>
                    }
                >
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
