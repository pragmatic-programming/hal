import React from "react";
import { Edge, NodeProps, useReactFlow } from "reactflow";
import { IconButton, Theme, Tooltip, useTheme } from "@mui/material";
import { Add } from "@mui/icons-material";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { borderColor } from "../../../util";
import { nodeDefinitionEditor, nodeDefinitionImage } from "../../../model/node/nodeDefinitions";
import { BoxBorder } from "../../util/BoxBorder";
import HandleTargetTop from "../handle/HandleTargetTop";
import HandleTargetLeft from "../handle/HandleTargetLeft";
import NodeCreateButton from "./NodeCreateButton";

export default function NodeCreate(props: NodeProps): React.JSX.Element {
    const theme: Theme = useTheme();
    const targetEdge: Edge | undefined = useReactFlow().getEdges().find(edge => edge.target === props.id);
    let handleTop;
    let handleLeft;
    let targetEdgeId;
    if (targetEdge) {
        targetEdgeId = targetEdge.id;
        switch (targetEdge.targetHandle) {
            case "top":
                handleTop = <HandleTargetTop nodeId={props.id}/>;
                break;
            case "left":
                handleLeft = <HandleTargetLeft nodeId={props.id}/>;
                break;
        }
    }
    return (
        <BoxBorder
            borderColor={borderColor(props, theme, theme.palette.primary.main)}
        >
            {handleLeft}
            {handleTop}
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
                        targetEdgeId={targetEdgeId}
                    />
                </div>
                <div>
                    <NodeCreateButton
                        nodeId={props.id}
                        nodeDefinition={nodeDefinitionImage}
                        placement={"bottom"}
                        targetEdgeId={targetEdgeId}
                    />
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
