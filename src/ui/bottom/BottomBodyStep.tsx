import { Processor } from "kico";
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
    const processor = <ModelProcessor processor={props.processor}/>;
    const model = <InterModel processor={props.processor}/>;
    if (props.index === 0) {
        return <>
            <ModelStart processor={props.processor}/>
            {processor}
            {model}
        </>;
    }
    if (props.index === props.length - 1) {
        return <>
            {processor}
            <ModelEnd processor={props.processor}/>
        </>;
    }
    return <>
        {processor}
        {model}
    </>;

}
