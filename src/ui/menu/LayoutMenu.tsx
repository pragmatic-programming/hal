import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import BoltIcon from "@mui/icons-material/Bolt";
import MenuButton from "./MenuButton";
import { State } from "../../state/State";
import { useStore } from "../../state/Store";
import { useReactFlow } from "reactflow";

export default function Menu(): React.JSX.Element {
    const {getNode, fitView} = useReactFlow();
    const layout = useStore((state: State) => state.layout);
    return (
        <>
            <MenuButton
                icon={<MoreVertIcon/>}
                onClick={() => layout(getNode, fitView, {"elk.algorithm": "layered", "elk.direction": "DOWN"})}
                tooltip="Vertical Layout"
            />
            <MenuButton
                icon={<MoreHorizIcon/>}
                onClick={() => layout(getNode, fitView, {"elk.algorithm": "layered", "elk.direction": "RIGHT"})}
                tooltip="Horizontal Layout"
            />
            <MenuButton
                icon={<DataUsageIcon/>}
                onClick={() => layout(getNode, fitView, {"elk.algorithm": "org.eclipse.elk.radial"})}
                tooltip="Radial Layout"
            />
            <MenuButton
                icon={<BoltIcon/>}
                onClick={() => layout(getNode, fitView, {"elk.algorithm": "org.eclipse.elk.force"})}
                tooltip="Force Layout"
            />
        </>
    );
}
