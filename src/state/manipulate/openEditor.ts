import { State } from "../State";
import { Node } from "reactflow";
import NodeData from "../../model/NodeData";
import { StoreApi } from "zustand";

export function openEditor(setState: StoreApi<State>["setState"], getState: () => State) {
    return (getNode: (id: string) => Node | undefined, editorId: string | undefined) => {
        if (editorId) {
            const node: Node<NodeData> | undefined = getNode(editorId);
            if (!node) {
                throw new Error("Node is undefined");
            }
            setState({
                editorOpen: {
                    nodeId: editorId,
                    content: node.data.content,
                    label: node.data.label,
                }
            });
        } else {
            const editorOpen = getState().editorOpen;
            if (!editorOpen) {
                throw new Error("EditorOpen is undefined");
            }
            setState({
                editorOpen: undefined,
                nodes: getState().nodes.map((node: Node<NodeData>) => {
                    if (node.id === editorOpen.nodeId) {
                        node.data = {
                            ...node.data,
                            label: editorOpen.label,
                            content: editorOpen.content,
                        };
                    }
                    return node;
                })
            });

        }
    };
}
