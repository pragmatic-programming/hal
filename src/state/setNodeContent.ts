import { State } from "./State";
import { Node } from "reactflow";


export function setNodeContent(getState: () => State, setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void) {
    return async (getNode: (id: string) => Node | undefined, editorId: string, content: string | undefined) => {
        setState({
            nodes: getState().nodes.map(node => {
                if (node.id === editorId) {
                    node.data = {
                        ...node.data,
                        content: content
                    };
                }
                return node;
            })
        });
    };
}
