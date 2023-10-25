import { State } from "./State";
import { Node } from "reactflow";
import NodeData from "../model/NodeData";


export function setNodeLabel(getState: () => State, setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void) {
    return async (getNode: (id: string) => Node | undefined, editorId: string, label: string) => {
        setState({
            nodes: getState().nodes.map((node: Node<NodeData>) => {
                if (node.id === editorId) {
                    node.data = {
                        ...node.data,
                        label: label
                    };
                }
                return node;
            })
        });
    };
}
