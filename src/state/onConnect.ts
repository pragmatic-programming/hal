import { State } from "./State";
import { addEdge, Connection } from "reactflow";
import { createExecuteEdge, createSequenceEdge } from "../model/createEdge";
import { StoreApi } from "zustand";

export function onConnect(setState: StoreApi<State>["setState"], getState: () => State) {
    return (connection: Connection) => {
        console.log(connection);
        const source = connection.source;
        const target = connection.target;
        if (!source) {
            throw new Error("Source is undefined");
        }
        if (!target) {
            throw new Error("Target is undefined");
        }
        const sourceNode = getState().nodes.find(node => node.id === source);
        const targetNode = getState().nodes.find(node => node.id === target);
        if (!sourceNode) {
            throw new Error("SourceNode is undefined");
        }
        if (!targetNode) {
            throw new Error("TargetNode is undefined");
        }
        if (connection.sourceHandle === "execute") {
            setState({
                edges: addEdge(createExecuteEdge(source, target), getState().edges),
            });
            return;
        }
        if (connection.sourceHandle === "sequence") {
            setState({
                edges: addEdge(createSequenceEdge(source, target), getState().edges),
            });
            return;
        }
        throw new Error("Can't create edge for sourceHandle type '" + connection.sourceHandle + "'");
    };
}
