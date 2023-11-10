import React from "react";
import { NodeProps } from "reactflow";
import { IconButton, Tooltip } from "@mui/material";
import { Add, Image, InsertDriveFile } from "@mui/icons-material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import DoneIcon from "@mui/icons-material/Done";
import HandleTarget from "../handle/HandleTarget";

export default function NodeCreation(props: NodeProps): React.JSX.Element {
    const dialogOpen = useStore((state: State) => state.dialog.dialogOpen);
    const transformCreationNode = useStore((state: State) => state.reactFlow.transformCreationNode);
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
                    <Tooltip
                        placement="top"
                        title={"Open new Node Dialog"}
                    >
                        <IconButton
                            onClick={() => dialogOpen(props.id)}
                        >
                            <Add/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        placement="top"
                        title={"Create new Editor Node"}
                    >
                        <IconButton
                            onClick={() => transformCreationNode(props.id, "editor")}
                        >
                            <InsertDriveFile/>
                        </IconButton>
                    </Tooltip>
                </div>
                <div>
                    <Tooltip
                        placement="bottom"
                        title={"Create new Result Node"}
                    >
                        <IconButton
                            onClick={() => transformCreationNode(props.id, "result")}
                        >
                            <DoneIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip
                        placement="bottom"
                        title={"Create new Image Node"}
                    >
                        <IconButton
                            onClick={() => transformCreationNode(props.id, "image")}
                        >
                            <Image/>
                        </IconButton>
                    </Tooltip>
                </div>
            </BoxBackgroundMain>
        </>
    );
}
