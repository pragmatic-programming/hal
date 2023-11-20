import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps } from "reactflow";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { Add } from "@mui/icons-material";
import { edgeDefinitions, retrieveEdgeDefinition } from "../../../model/edge/edgeDefinitions";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { firstCharUpperCase } from "../../../util";
import { EdgeDataCreate } from "../../../model/edge/EdgeData";
import { EdgePath, getEdgePath } from "../../../model/edge/EdgePath";
import { EdgePathStyle } from "../../../model/edge/EdgePathStyle";

export default function EdgeCreate(props: EdgeProps<EdgeDataCreate>): React.JSX.Element {
    const edgePathStyle: EdgePathStyle = useStore((state: State) => state.reactFlow.edgePathStyle);
    const edgePath: EdgePath = getEdgePath(edgePathStyle, props);
    const edgeDefinition: EdgeDefinition = retrieveEdgeDefinition("create");
    const transformCreationEdge = useStore((state: State) => state.reactFlow.transformCreateEdge);
    const edgeData: EdgeDataCreate | undefined = props.data;
    if (!edgeData) {
        throw new Error("Props.edgeData is undefined");
    }
    return (
        <>
            <BaseEdge
                id={props.id}
                markerEnd={props.markerEnd}
                path={edgePath.path}
                style={edgeDefinition.style}
            />
            <EdgeLabelRenderer>
                <div
                    style={{
                        pointerEvents: "all",
                        position: "absolute",
                        transform: `translate(-50%, -50%) translate(${edgePath.labelX}px,${edgePath.labelY}px)`,
                    }}
                    className="nopan nodrag"
                >
                    <BoxBackgroundMain>
                        {edgeDefinitions
                            .filter((edgeDefinition: EdgeDefinition): boolean => edgeDefinition.type !== "create" && !edgeData.deniedEdgeTypes.includes(edgeDefinition.type))
                            .map((edgeDefinition: EdgeDefinition) =>
                                <Tooltip
                                    key={edgeDefinition.type}
                                    placement="top"
                                    title={"Create new " + firstCharUpperCase(edgeDefinition.type) + " Edge"}
                                >
                                    <IconButton
                                        onClick={() => transformCreationEdge(props.id, edgeDefinition, props.target,)}
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
                            <IconButton
                                disabled={true}
                            >
                                <Add/>
                            </IconButton>
                        </Tooltip>
                    </BoxBackgroundMain>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}

