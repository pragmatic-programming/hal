import React from "react";
import { NodeProps, useReactFlow } from "reactflow";
import { IconButton, SvgIcon, Theme, Tooltip, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { NodeDefinition } from "../../../model/node/NodeDefinition";
import { borderColor, firstCharUpperCase } from "../../../util";
import { nodeDefinitionEditor, nodeDefinitionImage } from "../../../model/node/nodeDefinitions";
import { BoxBorder } from "../../util/BoxBorder";
import HandleTargetTop from "../handle/HandleTargetTop";
import HandleTargetLeft from "../handle/HandleTargetLeft";

function button(
    transformCreationNode: (nodeId: string, nodeDefinition: NodeDefinition, targetEdeId: string | undefined) => void,
    nodeId: string,
    targetEdgeId: string | undefined,
    nodeDefinition: NodeDefinition,
    placement: "bottom" | "top",
): React.JSX.Element {
    return <Tooltip
        placement={placement}
        title={"Create new " + firstCharUpperCase(nodeDefinition.type) + " Node"}
    >
        <IconButton
            onClick={() => transformCreationNode(nodeId, nodeDefinition, targetEdgeId)}
        >
            <SvgIcon component={nodeDefinition.icon}></SvgIcon>
        </IconButton>
    </Tooltip>;
}

export default function NodeCreate(props: NodeProps): React.JSX.Element {
    const transformCreationNode = useStore((state: State) => state.reactFlow.transformCreateNode);
    const theme: Theme = useTheme();
    const {getEdges} = useReactFlow();
    const targetEdge = getEdges().find(edge => edge.target === props.id);
    let targetEdgeId: string | undefined = undefined;
    if (targetEdge) {
        targetEdgeId = targetEdge.id;
    }
    return (
        <BoxBorder
            borderColor={borderColor(props, theme, theme.palette.primary.main)}
        >
            <HandleTargetTop
                nodeId={props.id}
            />
            <HandleTargetLeft
                nodeId={props.id}
            />
            <BoxBackgroundMain
                style={{
                    padding: 10,
                }}
            >
                <div>
                    {button(transformCreationNode, props.id, targetEdgeId, nodeDefinitionEditor, "top",)}
                </div>
                <div>
                    {button(transformCreationNode, props.id, targetEdgeId, nodeDefinitionImage, "bottom",)}
                    <Tooltip
                        placement="top"
                        title={"Show more options"}
                    >
                        <IconButton
                            onClick={() => console.log("To be implemented")}
                        >
                            <Add/>
                        </IconButton>
                    </Tooltip>
                </div>
            </BoxBackgroundMain>
        </BoxBorder>
    );
}
