import { EdgeProps } from "reactflow";
import React from "react";
import EdgeDefault from "./EdgeDefault";
import { edgeDefinitionExecute } from "../../../model/edge/edgeDefinitions";

export default function EdgeWYTIWYG(props: EdgeProps): React.JSX.Element {
    return (
        <EdgeDefault
            {...props}
            edgeDefinition={edgeDefinitionExecute}
        />
    );
}
