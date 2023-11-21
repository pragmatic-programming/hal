import React from "react";
import { State } from "../../../state/State";
import { useStore } from "../../../state/Store";
import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { firstCharUpperCase, LayoutOptionTypeIndicator } from "../../../util";

interface Props {
    layoutOption: LayoutOptionTypeIndicator;
    icon: React.JSX.Element;
}

export default function MenuLayoutsButtonLayout(props: Props): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    const layout = useStore((state: State) => state.flow.layout);
    const layoutOption: LayoutOptionTypeIndicator = useStore((state: State) => state.flow.layoutOption);
    return (
        <ListItem>
            <ListItemButton
                selected={layoutOption === props.layoutOption}
                onClick={() => layout(reactFlow.fitView, props.layoutOption)}
            >
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                {firstCharUpperCase(props.layoutOption)}
            </ListItemButton>
        </ListItem>
    );
}
