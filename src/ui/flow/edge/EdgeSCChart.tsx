import { EdgeProps } from "reactflow";
import React from "react";
import EdgeDefault from "./EdgeDefault";
import { edgeDefinitionSSChart } from "../../../model/edge/edgeDefinitions";

export default function EdgeSCChart(props: EdgeProps): React.JSX.Element {
    return (
        <EdgeDefault
            {...props}
            edgeDefinition={edgeDefinitionSSChart}
        />
    );
}
