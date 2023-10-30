import { State } from "../State";
import { StoreApi } from "zustand";
import { nodeType } from "../../ui/flow/flow/NodeTypes";

export function setNodeType(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (nodeId: string, type: nodeType) => {
        setState({
            newNodeDialogOpen: undefined,
            nodes: getState().nodes.map(node => {
                if (node.id === nodeId) {
                    node.type = type;
                }
                return node;
            })
        });
    };
}
