import React from "react";
import { Box, Stack, StepButton, Theme, useTheme } from "@mui/material";
import "./Bottom.scss";
import { gui } from "../../constants";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { CompilationContext } from "../../../../kico-core";
import { useStore } from "../../Store";
import { State } from "../../State";
import BottomRight from "./BottomRight";
import BottomLeft from "./BottomLeft";

export default function Bottom(): React.JSX.Element {
    const theme: Theme = useTheme();
    const context: CompilationContext = useStore((state: State) => state.context);
    return (
        <div
            style={{
                backgroundColor: theme.palette.gui.bottom.background,
                borderTop: "1px solid " + theme.palette.gui.menu.border,
                bottom: 0,
                // reduce bottomHeight by 4px, since paddingBottom and paddingTop will add 2px each
                height: gui.bottomHeight - 4,
                left: 0,
                paddingBottom: 2,
                paddingLeft: 5,
                paddingRight: 5,
                paddingTop: 2,
                position: "fixed",
                width: "calc(100vw - " + 10 + "px)",
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={0}
                style={{
                    width: "100%",
                    height: gui.bottomHeight - 4 - 36,
                }}
            >
                <Box sx={{width: "100%"}}>
                    <Stepper activeStep={0} alternativeLabel>
                        {context.processors.map((processor) => (
                            <Step key={processor.getId()}>
                                <StepButton>
                                    <StepLabel>{processor.getName()}</StepLabel>
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Stack>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                spacing={0}
                style={{
                    borderTop: "1px solid " + theme.palette.gui.menu.border,
                    bottom: 0,
                    height: 36,
                    position: "fixed",
                    width: "100%",
                }}
            >
                <BottomLeft/>
                <BottomRight/>
            </Stack>
        </div>
    );
}
