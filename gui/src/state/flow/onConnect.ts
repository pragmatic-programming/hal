import { State } from "../State";
import { addEdge, Connection } from "reactflow";
import { StoreApi } from "zustand";
import { isSourceHandleId } from "../../model/edge/SourceHandleId";
import { isTargetHandleId } from "../../model/edge/TargetHandleId";
import { EdgeFactory } from "../../model/edge/EdgeFactory";

export function onConnect(setState: StoreApi<State>["setState"], getState: () => State) {
    return (connection: Connection) => {
        const source: string | null = connection.source;
        const target: string | null = connection.target;
        const sourceHandleId: string | null = connection.sourceHandle;
        const targetHandleId: string | null = connection.targetHandle;
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
            flow: {
                ...getState().flow,
                edges: addEdge(EdgeFactory.edgeCreate(source, target, sourceHandleId, targetHandleId), getState().flow.edges),
            }
        });
    };
}
