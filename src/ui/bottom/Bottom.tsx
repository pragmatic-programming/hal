import React from "react";
import { Stack, Theme, useTheme } from "@mui/material";
import "./Bottom.scss";
import { gui } from "../../constants";
import { CompilationContext, Processor } from "../../../../kico-core";
import { useStore } from "../../Store";
import { State } from "../../State";
import BottomRight from "./BottomRight";
import BottomLeft from "./BottomLeft";
import ProcessorModel from "./ProcessorModel";
import StartModel from "./StartModel";
import InterModel from "./InterModel";
import EndModel from "./EndModel";

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
                <Stack
                    alignItems="center"
                    spacing={0}
                    direction="row"
                    justifyContent={"space-between"}
                    style={{
                        marginLeft: 50,
                        marginRight: 50,
                        width: "100%",
                        background: "linear-gradient(180deg, rgba(0,0,0,0) calc(50% - 1px), rgba(192,192,192,1) calc(50%), rgba(0,0,0,0) calc(50% + 1px))"
                    }}
                >
                    {context.processors.map((processor: Processor<any, any>, index: number) => (
                        // todo Warning: Each child in a list should have a unique "key" prop.
                        <>
                            {index === 0 ? <StartModel key={processor.getId() + "_start"}/> : <></>}
                            <ProcessorModel key={processor.getId() + "_processor"} processor={processor}/>
                            {index === context.processors.length - 1 ? <EndModel key={processor.getId() + "_end"}/> :
                                <InterModel key={processor.getId() + "_end"}/>
                            }

                        </>
                    ))}
                </Stack>
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
