import { State } from "./State";

export default function nextNodeId(state: State) {
    const highestId = Math.max(
        ...state.nodes.map(node => Number(node.id)), 0
    );
    return (highestId + 1).toString();
}
