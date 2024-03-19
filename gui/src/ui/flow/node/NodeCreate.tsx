import React from "react";
import { Edge, NodeProps, useReactFlow } from "reactflow";
import { Theme, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { borderColor } from "../../../util";
import { nodeDefinitionEditor, nodeDefinitionFile, nodeDefinitionImage } from "../../../model/node/nodeDefinitions";
import { BoxBorder } from "../../util/BoxBorder";
import HandleTargetTop from "../handle/HandleTargetTop";
import HandleTargetLeft from "../handle/HandleTargetLeft";
import NodeCreateButton from "./NodeCreateButton";
import { EdgeData } from "../../../model/edge/EdgeData";
import ButtonIconTooltip from "../../util/ButtonIconTooltip";

export default function NodeCreate(props: NodeProps): React.JSX.Element {
    const theme: Theme = useTheme();
    const targetEdge: Edge | undefined = useReactFlow().getEdges().find((edge: Edge<EdgeData>): boolean => edge.target === props.id);
    return (
        <BoxBorder
            borderColor={borderColor(props.data.status, props.selected, theme, theme.palette.primary.main)}
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
                    <NodeCreateButton
                        nodeId={props.id}
                        nodeDefinition={nodeDefinitionEditor}
                        placement={"top"}
                        targetEdgeId={targetEdge?.id}
                    />
                    <NodeCreateButton
                        nodeId={props.id}
                        nodeDefinition={nodeDefinitionFile}
                        placement={"top"}
                        targetEdgeId={targetEdge?.id}
                    />
                </div>
                <div>
                    <NodeCreateButton
                        nodeId={props.id}
                        nodeDefinition={nodeDefinitionImage}
                        placement={"bottom"}
                        targetEdgeId={targetEdge?.id}
                    />
                    <ButtonIconTooltip
                        disabled={true}
                        placement="top"
                        size={"medium"}
                        title={"Show more options"}
                    >
                        <Add/>
                    </ButtonIconTooltip>
                </div>
            </BoxBackgroundMain>
        </BoxBorder>
    );
}
