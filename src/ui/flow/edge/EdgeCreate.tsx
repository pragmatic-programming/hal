import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps } from "reactflow";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { Add } from "@mui/icons-material";
import { edgeDefinitions } from "../../../model/edge/edgeDefinitions";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { firstCharUpperCase, getEdgePath } from "../../../util";

export default function EdgeCreate(props: EdgeProps): React.JSX.Element {
    const transformCreationEdge = useStore((state: State) => state.reactFlow.transformCreateEdge);
    const edgePathStyle = useStore((state: State) => state.reactFlow.edgePathStyle);
    let {edgePath, labelX, labelY} = getEdgePath(edgePathStyle, props);
    return (
        <>
            <BaseEdge
                id={props.id}
                markerEnd={props.markerEnd}
                path={edgePath}
            />
            <EdgeLabelRenderer>
                <div
                    style={{
                        pointerEvents: "all",
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                    }}
                    className="nopan nodrag"
                >
                    <BoxBackgroundMain>
                        {edgeDefinitions
                            .filter((edgeDefinition: EdgeDefinition): boolean => edgeDefinition.type !== "create")
                            .map((edgeDefinition: EdgeDefinition) =>
                                <Tooltip
                                    key={edgeDefinition.type}
                                    placement="top"
                                    title={"Create new " + firstCharUpperCase(edgeDefinition.type) + " Edge"}
                                >
                                    <IconButton
                                        onClick={() => transformCreationEdge(props.id, edgeDefinition.type)}
                                    >
                                        <SvgIcon component={edgeDefinition.icon}></SvgIcon>
                                    </IconButton>
                                </Tooltip>
                            )
                        }
                        <Tooltip
                            placement="top"
                            title={"Open new Edge Dialog"}
                        >
                            <IconButton>
                                <Add/>
                            </IconButton>
                        </Tooltip>
                    </BoxBackgroundMain>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}

