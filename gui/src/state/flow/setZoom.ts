import { State } from "../State";
import { StoreApi } from "zustand";
import { StateFlow } from "./StateFlow";


export function setZoom(setState: StoreApi<State>["setState"], getState: () => State) {
    return async (zoom: number): Promise<void> => {
        const reactFlow: StateFlow = getState().flow;
        console.log("Zoom",zoom)
        setState({
            flow: {
                ...reactFlow,
                zoom: zoom,
            }
        });
    };
}
