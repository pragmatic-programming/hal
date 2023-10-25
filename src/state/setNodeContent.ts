import { State } from "./State";


export function setNodeContent(getState: () => State, setState: (partial: (Partial<State> | ((state: State) => (Partial<State> | State)) | State), replace?: (boolean | undefined)) => void) {
    return async (editorId: string, content: string | undefined) => {
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
