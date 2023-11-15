import React from "react";
import { useReactFlow } from "reactflow";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { NodeDefinition } from "../../../model/node/NodeDefinition";
import { firstCharUpperCase } from "../../../util";

interface Props {
    nodeId: string,
    nodeDefinition: NodeDefinition,
    placement: "bottom" | "top",
}

export default function NodeCreateButton(props: Props): React.JSX.Element {
    const transformCreationNode = useStore((state: State) => state.reactFlow.transformCreateNode);
    const {getEdges} = useReactFlow();
    const targetEdge = getEdges().find(edge => edge.target === props.nodeId);
    let targetEdgeId: string | undefined = undefined;
    if (targetEdge) {
        targetEdgeId = targetEdge.id;
    }
    return (
        <Tooltip
            placement={props.placement}
            title={"Create new " + firstCharUpperCase(props.nodeDefinition.type) + " Node"}
        >
            <IconButton
                onClick={() => transformCreationNode(props.nodeId, props.nodeDefinition, targetEdgeId)}
            >
                <SvgIcon component={props.nodeDefinition.icon}></SvgIcon>
            </IconButton>
        </Tooltip>
    );
}
