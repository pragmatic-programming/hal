import React from "react";
import { NodeProps } from "reactflow";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import { Add } from "@mui/icons-material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import HandleTarget from "../handle/HandleTarget";
import { NodeTypeIndicator } from "../../../model/node/NodeTypeIndicator";
import { NodeDefinition } from "../../../model/node/NodeDefinition";
import { firstCharUpperCase } from "../../../util";
import { nodeDefinitionEditor, nodeDefinitionImage } from "../../../model/node/nodeDefinitions";

function button(
    transformCreationNode: (nodeId: string, type: NodeTypeIndicator) => void,
    nodeId: string,
    nodeDefinition: NodeDefinition,
    placement: "bottom" | "top",
): React.JSX.Element {
    return <Tooltip
        placement={placement}
        title={"Create new " + firstCharUpperCase(nodeDefinition.type) + " Node"}
    >
        <IconButton
            onClick={() => transformCreationNode(nodeId, nodeDefinition.type)}
        >
            <SvgIcon component={nodeDefinition.icon}></SvgIcon>
        </IconButton>
    </Tooltip>;
}

export default function NodeCreate(props: NodeProps): React.JSX.Element {
    const transformCreationNode = useStore((state: State) => state.reactFlow.transformCreateNode);
    return (
        <>
            <HandleTarget
                nodeId={props.id}
                position={props.targetPosition}
            />
            <BoxBackgroundMain
                style={{
                    padding: 10,
                }}
            >
                <div>
                    {button(transformCreationNode, props.id, nodeDefinitionEditor, "top",)}
                </div>
                <div>
                    {button(transformCreationNode, props.id, nodeDefinitionImage, "bottom",)}
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
        </>
    );
}
