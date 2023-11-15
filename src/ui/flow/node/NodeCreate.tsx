import React from "react";
import { NodeProps } from "reactflow";
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
                    <NodeCreateButton nodeId={props.id} nodeDefinition={nodeDefinitionEditor} placement={"top"}/>
                </div>
                <div>
                    <NodeCreateButton nodeId={props.id} nodeDefinition={nodeDefinitionImage} placement={"bottom"}/>
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
