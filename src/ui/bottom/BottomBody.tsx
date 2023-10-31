import { Stack } from "@mui/material";
import { CompilationContext, Processor } from "kico";
import BottomBodyStep from "./BottomBodyStep";
import React from "react";
import { bottomHeight } from "./Bottom";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export function BottomBody(): React.JSX.Element {
    const context: CompilationContext = useStore((state: State) => state.context);
    return (
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
                    <BottomBodyStep
                        key={processor.getId()}
                        processor={processor}
                        index={index}
                        length={context.processors.length}
                    />
                ))}
            </Stack>
        </Stack>
    )
}
