import { Stack } from "@mui/material";
import { CompilationContext, Processor } from "@pragmatic-programming/kico";
import BottomBodyStep from "./BottomBodyStep";
import React from "react";
import { bottomHeight } from "./Bottom";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { bottomFooterHeight } from "./BottomFooter";

export function BottomBody(): React.JSX.Element {
    const context: CompilationContext = useStore((state: State) => state.compilation.context);
    const processors: Processor<any, any>[] = [...context.processors];
    const showHALProcessor: boolean = useStore((state: State) => state.compilation.options.showHALProcessor);
    if (!showHALProcessor) {
        processors.shift();
    }
    return (
        <Stack
            alignItems="center"
            direction="row"
            spacing={0}
            style={{
                height: bottomHeight - bottomFooterHeight,
            }}
        >
            <Stack
                alignItems="center"
                direction="row"
                justifyContent={"space-between"}
                spacing={0}
                style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0) calc(50% - 1px), rgba(192,192,192,1) calc(50%), rgba(0,0,0,0) calc(50% + 1px))",
                    marginLeft: 50,
                    marginRight: 50,
                    marginTop: 5,
                    width: "100%",
                }}
            >
                {processors.map((processor: Processor<any, any>, index: number) => (
                    <BottomBodyStep
                        index={index}
                        key={processor.getId() + index}
                        length={processors.length}
                        processor={processor}
                    />
                ))}
            </Stack>
        </Stack>
    );
}
