import { Edge } from "reactflow";
import { EdgeDefinition } from "./EdgeDefinition";
import { createEdgeId } from "./createEdge";
import { createEdgeDataFromCreationEdge } from "./createEdgeData";

export class HalEdge {
    private readonly edge: Edge;

    constructor(edge: Edge) {
        this.edge = edge;
    }

    transformByEdgeDefinition(edgeDefinition: EdgeDefinition): Edge {
        const edge = {
            ...this.edge
        };
        if (edge.type !== "create") {
            throw new Error("Edge is not from type create");
        }
        edge.id = createEdgeId(edge.source, edge.target, edge.data.sourceHandle, edge.data.targetHandle, edgeDefinition.type);
        edge.type = edgeDefinition.type;
        edge.animated = edgeDefinition.animated;
        edge.label = edgeDefinition.type;
        edge.data = createEdgeDataFromCreationEdge(
            edgeDefinition.type,
            edge.data.sourceHandle,
            edge.data.targetHandle
        );
        return edge;
    }
}
