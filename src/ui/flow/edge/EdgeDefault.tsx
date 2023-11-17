import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, ReactFlowInstance, useReactFlow } from "reactflow";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { EdgePath, getEdgePath } from "../../../util";
import { retrieveEdgeDefinition } from "../../../model/edge/edgeDefinitions";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import EdgeDefaultLabel from "./EdgeDefaultLabel";
import { EdgeData } from "../../../model/edge/EdgeData";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { StrictEdge, strictEdge } from "../../../model/edge/StrictEdge";

export default function EdgeDefault(props: EdgeProps): React.JSX.Element {
    const edgePathStyle = useStore((state: State) => state.reactFlow.edgePathStyle);
    const edgePath: EdgePath = getEdgePath(edgePathStyle, props);
    const reactFlow: ReactFlowInstance = useReactFlow();
    const edge: StrictEdge<EdgeData> = strictEdge(reactFlow.getEdge(props.id));
    const edgeDefinition: EdgeDefinition = retrieveEdgeDefinition(edge.type);
    if (typeof props.label != "string") {
        throw Error("Label is not a string");
    }
    return (
        <>
            <BaseEdge
                id={props.id}
                markerEnd={props.markerEnd}
                path={edgePath.edgePath}
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
                        <EdgeDefaultLabel
                            edgeDefinition={edgeDefinition}
                            id={props.id}
                            label={props.label}
                        />
                    </BoxBackgroundMain>
                </div>
            </EdgeLabelRenderer>
        </>
    );
}

