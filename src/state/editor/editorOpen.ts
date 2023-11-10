import { State } from "../State";
import { Node } from "reactflow";
import { NodeData } from "../../model/node/NodeData";
import { StoreApi } from "zustand";
import { StateReactFlow } from "../reactFlow/StateReactFlow";
import { StateEditorOpen } from "./StateEditor";

export function editorOpen(setState: StoreApi<State>["setState"], getState: () => State) {
    return (getNode: (id: string) => Node | undefined, editorId: string | undefined) => {
        const editor = getState().editor;
        if (editorId) {
            const node: Node<NodeData> | undefined = getNode(editorId);
            if (!node) {
                throw new Error("Node is undefined");
            }
            if(node.data.type !== "editor"){
                throw new Error("Node.data has wrong type");
            }
            setState({
                editor: {
                    ...editor,
                    open: {
                        nodeId: editorId,
                        content: node.data.content,
                        label: node.data.label,
                    }
                }
            });
        } else {
            const open: StateEditorOpen | undefined = editor.open;
            if (!open) {
                throw new Error("EditorOpen.open is undefined");
            }
            const reactFlow: StateReactFlow = getState().reactFlow;
            setState({
                editor: {
                    ...editor,
                    open: undefined
                },
                reactFlow: {
                    ...reactFlow,
                    nodes: reactFlow.nodes.map((node: Node<NodeData>) => {
                        if (node.id === open.nodeId) {
                            if(node.data.type !== "editor"){
                                throw new Error("Node.data has wrong type");
                            }
                            node.data = {
                                ...node.data,
                                label: open.label,
                                content: open.content,
                            };
                        }
                        return node;
                    })
                }
            });

        }
    };
}
