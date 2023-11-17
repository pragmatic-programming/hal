import React from "react";
import { Hive } from "@mui/icons-material";
import ButtonMenu from "./ButtonMenu";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { LayoutOptionTypeIndicator } from "../../util";

export default function ButtonLayout(): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    const layoutOptions: LayoutOptionTypeIndicator = useStore((state: State) => state.reactFlow.layoutOption);
    const layout = useStore((state: State) => state.reactFlow.layout);
    return (
        <ButtonMenu
            onClick={() => layout(reactFlow.fitView, layoutOptions)}
            icon={<Hive fontSize="inherit"/>}
            tooltip="Layout"
        />
    );
}
