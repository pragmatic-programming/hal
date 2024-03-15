import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, ReactFlowInstance, useReactFlow } from "reactflow";
import { retrieveEdgeDefinition } from "../../../../model/edge/edgeDefinitions";
import EdgeDefaultLabel from "./label/EdgeDefaultLabel";
import { EdgeData } from "../../../../model/edge/EdgeData";
import { EdgeDefinition } from "../../../../model/edge/EdgeDefinition";
import { StrictEdge, strictEdge } from "../../../../model/edge/StrictEdge";
import { EdgePath, getEdgePath } from "../../../../model/edge/EdgePath";

export default function EdgeDefault(props: EdgeProps<EdgeData>): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    const edge: StrictEdge<EdgeData> = strictEdge(reactFlow.getEdge(props.id));
    const edgeDefinition: EdgeDefinition = retrieveEdgeDefinition(edge.type);
    if (typeof props.label != "string") {
        throw Error("Label is not a string");
    }
    const edgePath: EdgePath = getEdgePath(edge.data.edgePathStyle, props);
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
                    <EdgeDefaultLabel
                        edgeData={edge.data}
                        edgeDefinition={edgeDefinition}
                        id={props.id}
                        label={props.label}
                        type={edge.type}
                    />
                </div>
            </EdgeLabelRenderer>
        </>
    );
}

