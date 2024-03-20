import React from "react";
import { Games, TextFields, Commit } from "@mui/icons-material";

import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import MenuButtonThreefold from "./MenuButtonThreefold";

export default function MenuButtonVerboseMode(): React.JSX.Element {
    const toggleVerboseMode = useStore((state: State) => state.flow.toggleVerboseMode);
    const verboseMode = useStore((state: State) => state.flow.verboseMode);
    let step: "one" | "two" | "three" = "three";
    if (verboseMode === "compact") {
        step = "one";
    }
    if (verboseMode === "middle") {
        step = "two";
    }
    return (
        <MenuButtonThreefold
            iconStepOne={<Commit fontSize="inherit"/>}
            iconStepThree={<Games fontSize="inherit"/>}
            iconStepTwo={<TextFields fontSize="inherit"/>}
            onClick={toggleVerboseMode}
            step={step}
            tooltipStepOne="Compact"
            tooltipStepThree="Verbose"
            tooltipStepTwo="Middle"
        />
    );
}
