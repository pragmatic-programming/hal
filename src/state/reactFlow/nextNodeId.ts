import { State } from "../State";

export function nextNodeId(getState: () => State) {
    return (): string => {
        const highestId = Math.max(
            ...getState().reactFlow.nodes.map(node => Number(node.id)), 0
        );
        return (highestId + 1).toString();
    };
}

