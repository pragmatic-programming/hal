import React from "react";
import Model from "./Model";
import { Processor } from "kico";

interface Props {
    processor: Processor<any, any>;
}

export default function StartModel(props: Props): React.JSX.Element {
    return (
        <Model
            position={"inter"}
            processor={props.processor}
        />
    );
}
