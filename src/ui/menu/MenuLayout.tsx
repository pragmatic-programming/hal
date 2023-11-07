import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import BoltIcon from "@mui/icons-material/Bolt";
import ButtonMenu from "./ButtonMenu";
import { State } from "../../state/State";
import { useStore } from "../../state/Store";
import { useReactFlow } from "reactflow";

export default function MenuLayout(): React.JSX.Element {
    const {fitView} = useReactFlow();
    const layout = useStore((state: State) => state.reactFlow.layout);
    return (
        <>
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
                onClick={() => layout(fitView, {"elk.algorithm": "org.eclipse.elk.radial"})}
                tooltip="Radial Layout"
            />
            <ButtonMenu
                icon={<BoltIcon/>}
                onClick={() => layout(fitView, {"elk.algorithm": "org.eclipse.elk.force"})}
                tooltip="Force Layout"
            />
        </>
    );
}
