import React from "react";
import { useStore } from "../../../../../state/Store";
import { State } from "../../../../../state/State";
import { EdgeDefinition } from "../../../../../model/edge/EdgeDefinition";
import { EdgeDefaultLabelCompact } from "./compact/EdgeDefaultLabelCompact";
import { EdgeData } from "../../../../../model/edge/EdgeData";
import EdgeDefaultLabelVerbose from "./verbose/EdgeDefaultLabelVerbose";
import EdgeDefaultLabelText from "./text/EdgeDefaultLabelText";
import { ModeIndicator } from "../../../../../state/flow/ModeIndicator";

interface Props {
    edgeDefinition: EdgeDefinition;
    edgeData: EdgeData;
    id: string;
    label: string;
    type: string;
}

export default function EdgeDefaultLabel(props: Props): React.JSX.Element {
    const mode: ModeIndicator = useStore((state: State) => state.flow.mode);
    switch (mode) {
        case "compact":
            return (
                <EdgeDefaultLabelCompact
                    edgeDefinition={props.edgeDefinition}
                    edgePathStyle={props.edgeData.edgePathStyle}
                    id={props.id}
                />
            );
        case "text":
            return (
                <EdgeDefaultLabelText
                    edgeData={props.edgeData}
                    edgeDefinition={props.edgeDefinition}
                    id={props.id}
                    label={props.label}
                    type={props.type}
                />
            );
        case "verbose":
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
}

