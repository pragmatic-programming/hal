import React from "react";
import { Commit, Games, TextFields } from "@mui/icons-material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import MenuButtonSteps from "./MenuButtonSteps";
import { ModeIndicator } from "../../state/flow/ModeIndicator";
import { Step } from "../util/ButtonSteps";

function step(mode: ModeIndicator): number {
    switch (mode) {
        case "verbose":
            return 0;
        case "compact":
            return 1;
        case "text":
            return 2;
    }
}

const steps: Step[] = [
    {
        tooltip: "Verbose",
        icon: <Games fontSize="inherit"/>,
    },
    {
        tooltip: "Compact",
        icon: <Commit fontSize="inherit"/>,
    },
    {
        tooltip: "Text",
        icon: <TextFields fontSize="inherit"/>,
    }
];

export default function MenuButtonMode(): React.JSX.Element {
    const cycleMode = useStore((state: State) => state.flow.cycleMode);
    const mode: ModeIndicator = useStore((state: State) => state.flow.mode);
    return (
        <MenuButtonSteps
            onClick={cycleMode}
            step={step(mode)}
            steps={steps}
        />
    );
}
