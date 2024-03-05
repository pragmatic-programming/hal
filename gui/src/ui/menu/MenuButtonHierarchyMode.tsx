import React from "react";

import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import MenuButtonToggle from "./MenuButtonToggle";
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';

export default function MenuButtonHierarchyMode(): React.JSX.Element {
    const toggleHierarchyMode = useStore((state: State) => state.flow.toggleHierarchyMode);
    const hierarchyMode: boolean = useStore((state: State) => state.flow.hierarchyMode);
    return (
        <MenuButtonToggle
            iconOn={<AutoAwesomeMosaicIcon fontSize="inherit"/>}
            iconOff={<AutoAwesomeMotionIcon fontSize="inherit"/>}
            on={hierarchyMode}
            onClick={toggleHierarchyMode}
            tooltipOff="Hierarchy"
            tooltipOn="Flat"
        />
    );
}
