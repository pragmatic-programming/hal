import { NodeTypes } from "reactflow";
import { NodeDefinition } from "./NodeDefinition";

export function createNodeTypesMapping(nodeDefinitions: NodeDefinition[]): NodeTypes {
    const nodeTypesMapping: NodeTypes = {};

    for (const edgeTypesMappingKey of nodeDefinitions) {
        nodeTypesMapping[edgeTypesMappingKey.type] = edgeTypesMappingKey.component;
    }
    return nodeTypesMapping;
}
