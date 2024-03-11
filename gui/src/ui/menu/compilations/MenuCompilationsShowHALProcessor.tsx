import MenuCompilationsOptionButton from "./MenuCompilationsOptionButton";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";

export function MenuCompilationsShowHALProcessor() {
    const showHALProcessor: boolean = useStore((state: State) => state.compilation.options.showHALProcessor);
    const toggleShowHALProcessor = useStore((state: State) => state.compilation.options.toggleShowHALProcessor);
    return (
        <MenuCompilationsOptionButton
            on={showHALProcessor}
            onClick={toggleShowHALProcessor}
            optionName={"Show HAL processor"}
        />
    );
}
