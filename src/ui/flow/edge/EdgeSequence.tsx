import { EdgeProps } from "reactflow";
import React from "react";
import EdgeDefault from "./EdgeDefault";
import { edgeDefinitionSequence } from "../../../model/edge/edgeDefinitions";

export default function EdgedSequence(props: EdgeProps): React.JSX.Element {
    return (
        <EdgeDefault
            {...props}
            edgeDefinition={edgeDefinitionSequence}
        />
    );
}
