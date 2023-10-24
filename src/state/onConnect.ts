import { State } from "./State";
import { addEdge, Connection } from "reactflow";
import { createExecuteEdge, createSequenceEdge } from "../model/createEdge";

export function onConnect(getState: () => State, setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void) {
    return (connection: Connection) => {
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
        // todo refactor this
        if (sourceNode.type === "editorNode" && targetNode.type === "resultNode") {
            setState({
                edges: addEdge(createExecuteEdge(source, target), getState().edges),
            });
            return;
        }
        if (sourceNode.type === "editorNode" && targetNode.type === "editorNode") {
            setState({
                edges: addEdge(createSequenceEdge(source, target), getState().edges),
            });
            return;
        }
        setState({
            edges: addEdge(connection, getState().edges),
        });
    };
}
