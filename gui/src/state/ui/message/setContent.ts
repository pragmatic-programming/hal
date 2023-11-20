import { State } from "../../State";
import { StoreApi } from "zustand";


export function setContent(setState: StoreApi<State>["setState"], getState: () => State) {
    return (content: string | undefined): void => {
        setState({
            ui: {
                ...getState().ui,
                message: {
                    ...getState().ui.message,
                    content: content,
                }
            }
        });
    };
}
