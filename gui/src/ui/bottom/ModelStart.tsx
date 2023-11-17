import React from "react";
import Model from "./Model";
import { Processor } from "kico";

interface Props {
    processor: Processor<any, any>;
}

export default function ModelStart(props: Props): React.JSX.Element {
    return (
        <Model
            position={"start"}
            processor={props.processor}
        />
    );
}
