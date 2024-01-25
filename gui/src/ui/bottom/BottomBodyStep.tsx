import { Processor } from "@pragmatic-programming/kico";
import ModelStart from "./ModelStart";
import ModelProcessor from "./ModelProcessor";
import ModelEnd from "./ModelEnd";
import InterModel from "./ModelInter";
import React from "react";

interface Props {
    processor: Processor<any, any>;
    index: number;
    length: number;
}

export default function BottomBodyStep(props: Props) {
    const modelStart = <ModelStart processor={props.processor}/>;
    const processor = <ModelProcessor processor={props.processor}/>;
    const interModel = <InterModel processor={props.processor}/>;
    const modelEnd = <ModelEnd processor={props.processor}/>;
    // only one processor, just one step
    if (props.length === 1) {
        return <>
            {modelStart}
            {processor}
            {modelEnd}
        </>;
    }
    // more than one processor, first step
    if (props.index === 0) {
        return <>
            {modelStart}
            {processor}
            {interModel}
        </>;
    }
    // more than one processor, last step
    if (props.index === props.length - 1) {
        return <>
            {processor}
            {modelEnd}
        </>;
    }
    // more than one processor, intermediate step
    return <>
        {processor}
        {interModel}
    </>;

}
