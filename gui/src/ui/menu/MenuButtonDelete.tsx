import React from "react";
import ButtonDoubleClick from "../util/ButtonDoubleClick";
import { DeleteForever } from "@mui/icons-material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { IHGraph } from "@pragmatic-programming/ihgraph";

export default function MenuButtonDelete(): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    const run = useStore((state: State) => () => state.flow.render(
        new IHGraph(),
        reactFlow.fitView,
        "New",
    ));
    const menuOpenToggle = useStore((state: State) => state.ui.compilations.compilationsOpenToggle);
    return (
        <ButtonDoubleClick
            icon={<DeleteForever fontSize="inherit" color={"error"}/>}
            onClick={run}
            onDoubleClick={menuOpenToggle}
            size={"large"}
            tooltip="Clear Graph"
        />
    );
}
