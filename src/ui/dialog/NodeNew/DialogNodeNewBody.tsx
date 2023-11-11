import { Divider, List, ListItemButton, ListItemIcon, ListItemText, SvgIcon } from "@mui/material";
import React from "react";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { nodeDefinitions } from "../../../model/node/nodeDefinitions";
import { firstCharUpperCase } from "../../../util";

interface Props {
    nodeId: string;
}

export function DialogNodeNewBody(props: Props): React.JSX.Element {
    const transformCreationNode = useStore((state: State) => state.reactFlow.transformCreateNode);
    return (
        <List>
            {nodeDefinitions
                .filter(nodeDefinition => nodeDefinition.type !== "create")
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
                                primary={firstCharUpperCase(nodeDefinition.type)}
                            />
                        </ListItemButton>
                        <Divider/>
                    </>
                )}
        </List>
    );
}
