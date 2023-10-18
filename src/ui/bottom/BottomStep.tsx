import { Processor } from "kico";
import StartModel from "./StartModel";
import ProcessorModel from "./ProcessorModel";
import EndModel from "./EndModel";
import InterModel from "./InterModel";
import React from "react";

interface Props {
    processor: Processor<any, any>;
    index: number;
    length: number;
}

export default function BottomStep(props: Props) {
    const processor = <ProcessorModel processor={props.processor}/>;
    const model = <InterModel processor={props.processor}/>;
    if (props.index === 0) {
        return <>
            <StartModel processor={props.processor}/>
            {processor}
            {model}
        </>;
    }
    if (props.index === props.length - 1) {
        return <>
            {processor}
            <EndModel processor={props.processor}/>
        </>;
    }
    return <>
        {processor}
        {model}
    </>;

}
