import { EdgeTypes } from "reactflow";

import { EdgeDefinition } from "./EdgeDefinition";

export function createEdgeTypesMapping(edgeDefinitions: EdgeDefinition[]): EdgeTypes {
    const edgeTypesMapping: EdgeTypes = {};

    for (const edgeTypesMappingKey of edgeDefinitions) {
        edgeTypesMapping[edgeTypesMappingKey.type] = edgeTypesMappingKey.component;
    }
    return edgeTypesMapping;
}
