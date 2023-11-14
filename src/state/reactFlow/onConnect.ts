import { State } from "../State";
import { addEdge, Connection } from "reactflow";
import { StoreApi } from "zustand";
import { createEdgeCreate } from "../../model/edge/createEdge";
import { isSourceHandleId } from "../../model/edge/SourceHandleId";
import { isTargetHandleId } from "../../model/edge/TargetHandleId";

export function onConnect(setState: StoreApi<State>["setState"], getState: () => State) {
    return (connection: Connection) => {
        const source = connection.source;
        const target = connection.target;
        const sourceHandleId = connection.sourceHandle;
        const targetHandleId = connection.targetHandle;
        if (!source) {
            throw new Error("Source is undefined");
        }
        if (!target) {
            throw new Error("Target is undefined");
        }
        if (!isSourceHandleId(sourceHandleId)) {
            throw new Error("SourceHandleId is not from type SourceHandleId");
        }
        if (!isTargetHandleId(targetHandleId)) {
            throw new Error("TargetHandleId is not from type TargetHandleId");
        }
        setState({
            reactFlow: {
                ...getState().reactFlow,
                edges: addEdge(createEdgeCreate(source, target, sourceHandleId, targetHandleId), getState().reactFlow.edges),
            }
        });
    };
}
