import { EdgeTypes } from "reactflow";

import { EdgeDefinition } from "./EdgeDefinition";
import { defaultEdgeDefinitions } from "./edgeDefinitions";

function createEdgeTypesMapping(edgeDefinitions: EdgeDefinition[]): EdgeTypes {
    const edgeTypesMapping: EdgeTypes = {};

    for (const edgeDefinition of edgeDefinitions) {
        edgeTypesMapping[edgeDefinition.type] = edgeDefinition.component;
    }
    return edgeTypesMapping;
}

export const edgeTypesMapping: EdgeTypes = createEdgeTypesMapping(defaultEdgeDefinitions);
