import React, { CSSProperties } from "react";
import { Theme, useTheme } from "@mui/material";
import AddEditorButton from "./AddEditorButton";
import SwitchModeButton from "./SwitchModeButton";
import PlayButton from "./PlayButton";
import { gui } from "../../constants";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import BoltIcon from "@mui/icons-material/Bolt";
import { useLayouting } from "../flow/Layouting";
import MenuButton from "./MenuButton";
import MenuDivider from "./MenuDivider";

export default function Menu(): React.JSX.Element {
    const theme: Theme = useTheme();
    const layout = useLayouting();
    const style: CSSProperties = {
        position: "fixed",
        top: 0,
        left: 0,
        width: gui.menuWidth - 1, // subtract 1px which is added by borderRight
        height: "calc(100vh - " + gui.bottomHeight + "px)",
        backgroundColor: theme.palette.gui.menu.background,
        borderRight: "1px solid " + theme.palette.gui.menu.border
    };
    return (
        <div style={style}>
            <SwitchModeButton/>
            <MenuDivider/>
            <AddEditorButton/>
            <PlayButton/>
            <MenuDivider/>
            <MenuButton
                icon={<MoreVertIcon/>}
                onClick={() => layout({"elk.algorithm": "layered", "elk.direction": "DOWN"})}
                tooltip="Vertical Layout"
            />
            <MenuButton
                icon={<MoreHorizIcon/>}
                onClick={() => layout({"elk.algorithm": "layered", "elk.direction": "RIGHT"})}
                tooltip="Horizontal Layout"
            />
            <MenuButton
                icon={<DataUsageIcon/>}
                onClick={() => layout({"elk.algorithm": "org.eclipse.elk.radial"})}
                tooltip="Radial Layout"
            />
            <MenuButton
                icon={<BoltIcon/>}
                onClick={() => layout({"elk.algorithm": "org.eclipse.elk.force"})}
                tooltip="Force Layout"
            />
        </div>
    );
}
