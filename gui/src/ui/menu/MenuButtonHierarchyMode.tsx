import React from "react";

import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import MenuButtonToggle from "./MenuButtonToggle";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import { ReactFlowInstance, useReactFlow } from "reactflow";

export default function MenuButtonHierarchyMode(): React.JSX.Element {
    const toggleHierarchyMode = useStore((state: State) => state.flow.toggleHierarchyMode);
    const reactFlow: ReactFlowInstance = useReactFlow();
    const hierarchyMode: boolean = useStore((state: State) => state.flow.hierarchyMode);
    return (
        <MenuButtonToggle
            iconOff={<AutoAwesomeMotionIcon fontSize="inherit"/>}
            iconOn={<AutoAwesomeMosaicIcon fontSize="inherit"/>}
            on={hierarchyMode}
            onClick={() => toggleHierarchyMode(reactFlow.fitView)}
            tooltipOff="Hierarchy"
            tooltipOn="Flat"
        />
    );
}
