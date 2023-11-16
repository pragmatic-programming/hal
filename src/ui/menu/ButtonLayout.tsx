import React from "react";
import { Hive } from "@mui/icons-material";
import ButtonMenu from "./ButtonMenu";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { useReactFlow } from "reactflow";

export default function ButtonLayout(): React.JSX.Element {
    const reactFlow = useReactFlow();
    const layoutOptions = useStore((state: State) => state.reactFlow.layoutOption);
    const layout = useStore((state: State) => state.reactFlow.layout);
    return (
        <ButtonMenu
            onClick={()=>layout(reactFlow.fitView, layoutOptions)}
            icon={<Hive fontSize="inherit"/>}
            tooltip="Layout"
        />
    );
}
