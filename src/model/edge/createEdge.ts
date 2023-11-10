import { Edge, MarkerType, OnConnectStartParams } from "reactflow";
import { EdgeTypeIndicator, isEdgeTypeIndicator } from "./EdgeTypeIndicator";
import { edgeDefinitionExecute, edgeDefinitionSequence, edgeDefinitionSSChart, edgeDefintionWYTIWYG } from "./edgeDefinitions";
import { EdgeDefinition } from "./EdgeDefinition";

export function createEdgeFromOnConnectStartParams(onConnectStartParams: OnConnectStartParams, targetId: string): Edge {
    if (!onConnectStartParams.nodeId) {
        throw new Error("OnConnectStartParams.nodeId is null");
    }
    if (!onConnectStartParams.handleId) {
        throw new Error("OnConnectStartParams.handleId is null");
    }
    if (!isEdgeTypeIndicator(onConnectStartParams.handleId)) {
        throw new Error("OnConnectStartParams.handleId is not a valid edgeType");
    }
    return createEdgeFromEdgeType(
        onConnectStartParams.handleId,
        onConnectStartParams.nodeId,
        targetId
    );
}

export function createEdgeFromEdgeType(edgeType: EdgeTypeIndicator, sourceId: string, targetId: string): Edge {
    switch (edgeType) {
        case "sequence":
            return createEdgeFromEdgeDefinition(edgeDefinitionSequence, sourceId, targetId,);
        case "execute":
            return createEdgeFromEdgeDefinition(edgeDefinitionExecute, sourceId, targetId);
        case "scchart":
            return createEdgeFromEdgeDefinition(edgeDefinitionSSChart, sourceId, targetId);
        case "wytiwyg":
            return createEdgeFromEdgeDefinition(edgeDefintionWYTIWYG, sourceId, targetId);
    }
}


function createEdgeFromEdgeDefinition(
    edgeDefinition: EdgeDefinition,
    source: string,
    target: string,
): Edge {
    return {
        id: "e" + source + "-" + target + "-" + edgeDefinition.type,
        source: source,
        target: target,
        animated: edgeDefinition.animated,
        sourceHandle: edgeDefinition.type,
        targetHandle: "input",
        label: edgeDefinition.type,
        type: edgeDefinition.type,
        markerEnd: {
            type: MarkerType.ArrowClosed,
            width: 30,
            height: 30,
        },
        data: {}
    };
}
