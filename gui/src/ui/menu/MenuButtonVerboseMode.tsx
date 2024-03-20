import React from "react";
import { Commit, Games, TextFields } from "@mui/icons-material";

import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import MenuButtonThreefold from "./MenuButtonThreefold";
import { ModeIndicator } from "../../state/flow/ModeIndicator";
import { StepIndicator } from "../util/ButtonThreefold";

function step(mode: ModeIndicator): StepIndicator {
    switch (mode) {
        case "verbose":
            return "three";
        case "compact":
            return "one";
        case "text":
            return "two";
    }
}

export default function MenuButtonVerboseMode(): React.JSX.Element {
    const toggleVerboseMode = useStore((state: State) => state.flow.cycleMode);
    const mode: ModeIndicator = useStore((state: State) => state.flow.mode);
    return (
        <MenuButtonThreefold
            iconStepOne={<Commit fontSize="inherit"/>}
            iconStepThree={<Games fontSize="inherit"/>}
            iconStepTwo={<TextFields fontSize="inherit"/>}
            onClick={toggleVerboseMode}
            step={step(mode)}
            tooltipStepOne="Compact"
            tooltipStepThree="Verbose"
            tooltipStepTwo="Middle"
        />
    );
}
