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
import MenuLayoutButtonLayout from "./MenuLayoutButtonLayout";
import MenuLayoutButtonEdgePathStyle from "./MenuLayoutButtonEdgePathStyle";
import { Polyline } from "@mui/icons-material";

const menuExamplesWidth = 200;

export default function MenuLayout(): React.JSX.Element {
    const menuOpenToggle = useStore((state: State) => state.menuLayout.menuLayoutOpenToggle);
    const open: boolean = useStore((state: State) => state.menuLayout.open);
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
                    <MenuLayoutButtonLayout
                        icon={<MoreVertIcon/>}
                        layoutOption={"vertical"}
                    />
                    <MenuLayoutButtonLayout
                        icon={<MoreHorizIcon/>}
                        layoutOption={"horizontal"}
                    />
                    <MenuLayoutButtonLayout
                        icon={<DataUsageIcon/>}
                        layoutOption={"radial"}
                    />
                    <MenuLayoutButtonLayout
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
                    <MenuLayoutButtonEdgePathStyle
                        edgePathStyle={"Bezier"}
                        icon={<RedoIcon/>}
                    />
                    <MenuLayoutButtonEdgePathStyle
                        edgePathStyle={"Straight"}
                        icon={<CallMadeIcon/>}
                    />
                    <MenuLayoutButtonEdgePathStyle
                        edgePathStyle={"Smooth"}
                        icon={<MovingIcon/>}
                    />
                </List>
            </Drawer>
        </>
    );
}
