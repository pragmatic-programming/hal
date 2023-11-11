import { State } from "../State";
import { addEdge, Connection } from "reactflow";
import { StoreApi } from "zustand";
import { createEdgeCreate } from "../../model/edge/createEdge";

export function onConnect(setState: StoreApi<State>["setState"], getState: () => State) {
    return (connection: Connection) => {
        const source = connection.source;
        const target = connection.target;
        if (!source) {
            throw new Error("Source is undefined");
        }
        if (!target) {
            throw new Error("Target is undefined");
        }
        const sourceNode = getState().reactFlow.nodes.find(node => node.id === source);
        const targetNode = getState().reactFlow.nodes.find(node => node.id === target);
        if (!sourceNode) {
            throw new Error("SourceNode is undefined");
        }
        if (!targetNode) {
            throw new Error("TargetNode is undefined");
        }
        setState({
            reactFlow: {
                ...getState().reactFlow,
                edges: addEdge(createEdgeCreate(source, target), getState().reactFlow.edges),
            }
        });
    };
}
