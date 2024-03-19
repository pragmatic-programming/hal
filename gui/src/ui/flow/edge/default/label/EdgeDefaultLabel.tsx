import React from "react";
import { useStore } from "../../../../../state/Store";
import { State } from "../../../../../state/State";
import { EdgeDefinition } from "../../../../../model/edge/EdgeDefinition";
import { EdgeDefaultLabelCompact } from "./compact/EdgeDefaultLabelCompact";
import { EdgeData } from "../../../../../model/edge/EdgeData";
import EdgeDefaultLabelVerbose from "./verbose/EdgeDefaultLabelVerbose";
import EdgeDefaultLabelMiddle from "./middle/EdgeDefaultLabelMiddle";

interface Props {
    edgeDefinition: EdgeDefinition;
    edgeData: EdgeData;
    id: string;
    label: string;
    type: string;
}

export default function EdgeDefaultLabel(props: Props): React.JSX.Element {
    const verboseMode = useStore((state: State) => state.flow.verboseMode);
    if (verboseMode === "verbose") {
        return (
            <EdgeDefaultLabelVerbose
                edgeData={props.edgeData}
                edgeDefinition={props.edgeDefinition}
                id={props.id}
                label={props.label}
                type={props.type}
            />
        );
    }
    if (verboseMode === "middle") {
        return (
            <EdgeDefaultLabelMiddle
                edgeData={props.edgeData}
                edgeDefinition={props.edgeDefinition}
                id={props.id}
                label={props.label}
                type={props.type}
            />
        );
    }
    return (
        <EdgeDefaultLabelCompact
            edgeDefinition={props.edgeDefinition}
            edgePathStyle={props.edgeData.edgePathStyle}
            id={props.id}
        />
    );
}

