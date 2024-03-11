import MenuCompilationsButtonOption from "./MenuCompilationsButtonOption";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";

export function MenuCompilationsButtonShowHALProcessor() {
    const showHALProcessor: boolean = useStore((state: State) => state.compilation.options.showHALProcessor);
    const toggleShowHALProcessor = useStore((state: State) => state.compilation.options.toggleShowHALProcessor);
    return (
        <MenuCompilationsButtonOption
            on={showHALProcessor}
            onClick={toggleShowHALProcessor}
            optionName={"Show HAL processor"}
        />
    );
}
