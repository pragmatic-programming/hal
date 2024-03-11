import { State } from "../../State";
import { StoreApi } from "zustand";


export function toggleShowHALProcessor(setState: StoreApi<State>["setState"], getState: () => State) {
    return () => {
        const compilation = getState().compilation;
        setState({
            compilation: {
                ...compilation,
                options: {
                    ...compilation.options,
                    showHALProcessor: !compilation.options.showHALProcessor,
                }
            }
        });
    }
}

