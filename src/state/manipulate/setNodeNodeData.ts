import { State } from "../State";
import { Node } from "reactflow";
import NodeData from "../../model/NodeData";
import { StoreApi } from "zustand";


export function setNodeNodeData(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (editorId: string, nodeData: Partial<NodeData>) => {
        setState({
            nodes: getState().nodes.map((node: Node<NodeData>) => {
                if (node.id === editorId) {
                    node.data = {
                        ...node.data,
                        ...nodeData
                    };
                }
                return node;
            })
        });
    };
}
