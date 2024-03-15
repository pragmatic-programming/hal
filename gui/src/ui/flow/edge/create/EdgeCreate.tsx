import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps } from "reactflow";
import { retrieveEdgeDefinition } from "../../../../model/edge/edgeDefinitions";
import { EdgeDefinition } from "../../../../model/edge/EdgeDefinition";
import { EdgeDataCreate } from "../../../../model/edge/EdgeData";
import { EdgePath, getEdgePath } from "../../../../model/edge/EdgePath";
import EdgeCreateLabel from "./EdgeCreateLabel";

export default function EdgeCreate(props: EdgeProps<EdgeDataCreate>): React.JSX.Element {
    const edgeDefinition: EdgeDefinition = retrieveEdgeDefinition("create");
    const edgeData: EdgeDataCreate | undefined = props.data;
    if (!edgeData) {
        throw new Error("Props.edgeData is undefined");
    }
    const edgePath: EdgePath = getEdgePath(edgeData.edgePathStyle, props);
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
                    <EdgeCreateLabel
                        id={props.id}
                        deniedEdgeTypes={edgeData.deniedEdgeTypes}
                        edgePath={edgePath}
                        targetNodeId={props.target}
                    />
                </div>
            </EdgeLabelRenderer>
        </>
    );
}

