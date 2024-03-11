import {State} from "../State";
import {Position} from "reactflow";
import {StoreApi} from "zustand";
import {StateFlow} from "./StateFlow";
import {NodeFactory} from "../../model/node/NodeFactory";
import {nextNodeId} from "./nextNodeId";


export function addNodeCreate(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (): Promise<void> => {
        const reactFlow: StateFlow = getState().flow;
        setState({
            flow: {
                ...reactFlow,
                nodes: [
                    ...reactFlow.nodes,
                    NodeFactory.nodeCreate(
                        nextNodeId(getState)(),
                        // todo why 100/100?
                        {x: 100, y: 100},
                        Position.Left
                    )
                ]
            }
        });
    };
}
