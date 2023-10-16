import React from "react";
import { Stack, Theme, useTheme } from "@mui/material";
import "./Bottom.scss";
import { gui } from "../../constants";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { CompilationContext } from "../../../../kico-core";
import { useStore } from "../../Store";
import { State } from "../../State";

export default function Bottom(): React.JSX.Element {
    const theme: Theme = useTheme();
    const context: CompilationContext = useStore((state: State) => state.context);
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0}
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
            <Box sx={{width: "100%"}}>
                <Stepper activeStep={1} alternativeLabel>
                    {context.processors.map((processor) => (
                        <Step key={processor.getId()}>
                            <StepLabel>{processor.getName()}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </Stack>
    );
}
