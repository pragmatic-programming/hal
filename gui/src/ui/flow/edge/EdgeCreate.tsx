import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps } from "reactflow";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { retrieveEdgeDefinition } from "../../../model/edge/edgeDefinitions";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { EdgeDataCreate } from "../../../model/edge/EdgeData";
import { EdgePath, getEdgePath } from "../../../model/edge/EdgePath";
import { EdgePathStyle } from "../../../model/edge/EdgePathStyle";
import EdgeCreateLabel from "./EdgeCreateLabel";

export default function EdgeCreate(props: EdgeProps<EdgeDataCreate>): React.JSX.Element {
    const edgePathStyle: EdgePathStyle = useStore((state: State) => state.flow.edgePathStyle);
    const edgePath: EdgePath = getEdgePath(edgePathStyle, props);
    const edgeDefinition: EdgeDefinition = retrieveEdgeDefinition("create");
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

