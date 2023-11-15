import React from "react";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { NodeDefinition } from "../../../model/node/NodeDefinition";
import { firstCharUpperCase } from "../../../util";

interface Props {
    nodeId: string,
    nodeDefinition: NodeDefinition,
    placement: "bottom" | "top",
    targetEdgeId: string | undefined,
}

export default function NodeCreateButton(props: Props): React.JSX.Element {
    const transformCreationNode = useStore((state: State) => state.reactFlow.transformCreateNode);
    return (
        <Tooltip
            placement={props.placement}
            title={"Create new " + firstCharUpperCase(props.nodeDefinition.type) + " Node"}
        >
            <IconButton
                onClick={() => transformCreationNode(props.nodeId, props.nodeDefinition, props.targetEdgeId)}
            >
                <SvgIcon component={props.nodeDefinition.icon}></SvgIcon>
            </IconButton>
        </Tooltip>
    );
}
