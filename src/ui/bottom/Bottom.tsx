import React from "react";
import { Stack } from "@mui/material";
import "./Bottom.scss";
import { CompilationContext, Processor } from "../../../../kico-core";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import BottomRight from "./BottomRight";
import BottomLeft from "./BottomLeft";
import BottomStep from "./BottomStep";
import { BoxBackgroundMain } from "../BoxBackgroundMain";

export const bottomHeight = 150;

export default function Bottom(): React.JSX.Element {
    const context: CompilationContext = useStore((state: State) => state.context);
    return (
        <BoxBackgroundMain
            border="top"
            style={{
                bottom: 0,
                // reduce bottomHeight by 4px, since paddingBottom and paddingTop will add 2px each
                height: bottomHeight - 4,
                left: 0,
                paddingBottom: 2,
                paddingLeft: 0,
                paddingRight: 5,
                paddingTop: 2,
                position: "fixed",
                width: "calc(100vw - " + 5 + "px)",
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                spacing={0}
                style={{
                    width: "100%",
                    height: bottomHeight - 4 - 36,
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
                        <BottomStep
                            key={processor.getId()}
                            processor={processor}
                            index={index}
                            length={context.processors.length}
                        />
                    ))}
                </Stack>
            </Stack>
            <BoxBackgroundMain
                border="top"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bottom: 0,
                    paddingLeft: 10,
                    paddingRight: 5,
                    height: 36,
                    position: "fixed",
                    width: "calc(100% - 15px)",
                }}
            >
                <BottomLeft/>
                <BottomRight/>
            </BoxBackgroundMain>
        </BoxBackgroundMain>
    );
}
