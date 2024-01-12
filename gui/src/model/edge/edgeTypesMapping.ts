import { EdgeTypes } from "reactflow";

import { EdgeDefinition } from "./EdgeDefinition";
import { defaultEdgeDefinitions } from "./edgeDefinitions";

function createEdgeTypesMapping(edgeDefinitions: { [ key: string]: EdgeDefinition }): EdgeTypes {
    const edgeTypesMapping: EdgeTypes = {};

    for (const edgeTypesMappingKey of Object.values(edgeDefinitions)) {
        edgeTypesMapping[edgeTypesMappingKey.type] = edgeTypesMappingKey.component;
    }
    return edgeTypesMapping;
}

export const edgeTypesMapping: EdgeTypes = createEdgeTypesMapping(defaultEdgeDefinitions);
