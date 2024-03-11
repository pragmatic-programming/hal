import React from "react";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { EdgeDefaultLabelCross } from "./EdgeDefaultLabelCross";
import { EdgeData } from "../../../model/edge/EdgeData";
import EdgeDefaultLabelVerbose from "./EdgeDefaultLabelVerbose";

interface Props {
    edgeDefinition: EdgeDefinition;
    edgeData: EdgeData;
    id: string;
    label: string;
}

export default function EdgeDefaultLabel(props: Props): React.JSX.Element {
    const verboseMode: boolean = useStore((state: State) => state.flow.verboseMode);
    if (verboseMode) {
        return (
            <EdgeDefaultLabelVerbose
                edgeData={props.edgeData}
                edgeDefinition={props.edgeDefinition}
                id={props.id}
                label={props.label}
            />
        );
    }
    return (
        <EdgeDefaultLabelCross
            edgeDefinition={props.edgeDefinition}
            edgePathStyle={props.edgeData.edgePathStyle}
            id={props.id}
        />
    );
}

