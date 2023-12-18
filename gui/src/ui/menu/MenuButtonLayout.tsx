import React from "react";
import { Polyline } from "@mui/icons-material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { LayoutOptionTypeIndicator } from "../../util";
import MenuButtonDoubleClick from "./MenuButtonDoubleClick";


export default function MenuButtonLayout(): React.JSX.Element {
    const menuOpenToggle = useStore((state: State) => state.ui.layouts.layoutsOpenToggle);
    const reactFlow: ReactFlowInstance = useReactFlow();
    const layoutOptions: LayoutOptionTypeIndicator = useStore((state: State) => state.flow.layoutOption);
    const layout = useStore((state: State) => state.flow.layout);
    return (
        <MenuButtonDoubleClick
            icon={<Polyline/>}
            onClick={() => layout(reactFlow.fitView, layoutOptions)}
            onDoubleClick={menuOpenToggle}
            tooltip="Layout"
        />
    );
}