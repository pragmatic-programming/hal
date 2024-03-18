import React from "react";
import { SvgIcon } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { NodeDefinition } from "../../../model/node/NodeDefinition";
import { firstCharUpperCase } from "../../../util";
import ButtonIconTooltip from "../../util/ButtonIconTooltip";

interface Props {
    nodeId: string,
    nodeDefinition: NodeDefinition,
    placement: "bottom" | "top",
    targetEdgeId: string | null | undefined,
}

export default function NodeCreateButton(props: Props): React.JSX.Element {
    const transformCreateNode = useStore((state: State) => state.flow.transformCreateNode);
    return (
        <ButtonIconTooltip
            onClick={() => transformCreateNode(props.nodeId, props.nodeDefinition, props.targetEdgeId)}
            placement={props.placement}
            size={"medium"}
            title={"Create new " + firstCharUpperCase(props.nodeDefinition.type) + " Node"}
        >
            <SvgIcon component={props.nodeDefinition.icon}></SvgIcon>
        </ButtonIconTooltip>
    );
}
