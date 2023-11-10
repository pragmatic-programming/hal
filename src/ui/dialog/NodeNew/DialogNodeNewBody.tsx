import { Divider, List, ListItemButton, ListItemIcon, ListItemText, SvgIcon } from "@mui/material";
import React from "react";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { nodeDefinitions } from "../../../model/node/nodeDefinitions";

interface Props {
    nodeId: string;
}

export function DialogNodeNewBody(props: Props): React.JSX.Element {
    const transformCreationNode = useStore((state: State) => state.reactFlow.transformCreationNode);
    return (
        <List>
            {nodeDefinitions
                .filter(nodeDefinition => nodeDefinition.type !== "creation")
                .map(nodeDefinition =>
                    <>
                        <ListItemButton
                            key={nodeDefinition.type}
                            onClick={() => transformCreationNode(props.nodeId, nodeDefinition.type)}
                        >
                            <ListItemIcon>
                                <SvgIcon component={nodeDefinition.icon}></SvgIcon>
                            </ListItemIcon>
                            <ListItemText
                                primary={nodeDefinition.type.charAt(0).toUpperCase() + nodeDefinition.type.slice(1)}
                            />
                        </ListItemButton>
                        <Divider/>
                    </>
                )}
        </List>
    );
}
