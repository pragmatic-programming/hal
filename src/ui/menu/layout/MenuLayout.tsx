import React from "react";
import { State } from "../../../state/State";
import { useStore } from "../../../state/Store";
import { Divider, Drawer, List, ListSubheader } from "@mui/material";
import ButtonMenu from "../ButtonMenu";
import { useReactFlow } from "reactflow";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import BoltIcon from "@mui/icons-material/Bolt";
import RedoIcon from "@mui/icons-material/Redo";
import CallMadeIcon from "@mui/icons-material/CallMade";
import MovingIcon from "@mui/icons-material/Moving";
import MenuDivider from "../MenuDivider";
import Grid4x4Icon from "@mui/icons-material/Grid4x4";

const menuExamplesWidth = 300;

export default function MenuLayout(): React.JSX.Element {
    const {fitView} = useReactFlow();
    const layout = useStore((state: State) => state.reactFlow.layout);
    const setEdgePathStyle = useStore((state: State) => state.reactFlow.setEdgePathStyle);
    const open: boolean = useStore((state: State) => state.menuLayout.open);
    const menuOpenToggle = useStore((state: State) => state.menuLayout.menuLayoutOpenToggle);
    return (
        <>
            <ButtonMenu
                icon={<Grid4x4Icon/>}
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
                    <Divider/>
                    <ButtonMenu
                        icon={<MoreVertIcon/>}
                        onClick={() => layout(fitView, {"elk.algorithm": "layered", "elk.direction": "DOWN"})}
                        tooltip="Vertical Layout"
                    />
                    <ButtonMenu
                        icon={<MoreHorizIcon/>}
                        onClick={() => layout(fitView, {"elk.algorithm": "layered", "elk.direction": "RIGHT"})}
                        tooltip="Horizontal Layout"
                    />
                    <ButtonMenu
                        icon={<DataUsageIcon/>}
                        onClick={() => layout(fitView, {
                            "elk.algorithm": "org.eclipse.elk.radial",
                            "elk.direction": "DOWN"
                        })}
                        tooltip="Radial Layout"
                    />
                    <ButtonMenu
                        icon={<BoltIcon/>}
                        onClick={() => layout(fitView, {
                            "elk.algorithm": "org.eclipse.elk.force",
                            "elk.direction": "DOWN"
                        })}
                        tooltip="Force Layout"
                    />
                    <MenuDivider/>
                    <ButtonMenu
                        icon={<RedoIcon/>}
                        onClick={() => setEdgePathStyle("Bezier")}
                        tooltip="Bezier"
                    />
                    <ButtonMenu
                        icon={<CallMadeIcon/>}
                        onClick={() => setEdgePathStyle("Straight")}
                        tooltip="Straight"
                    />
                    <ButtonMenu
                        icon={<MovingIcon/>}
                        onClick={() => setEdgePathStyle("Smooth")}
                        tooltip="Smooth"
                    />
                </List>
            </Drawer>
        </>
    );
}
