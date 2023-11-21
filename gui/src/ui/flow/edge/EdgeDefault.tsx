import React from "react";
import { BaseEdge, EdgeLabelRenderer, EdgeProps, ReactFlowInstance, useReactFlow } from "reactflow";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { retrieveEdgeDefinition } from "../../../model/edge/edgeDefinitions";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import EdgeDefaultLabel from "./EdgeDefaultLabel";
import { EdgeData } from "../../../model/edge/EdgeData";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { StrictEdge, strictEdge } from "../../../model/edge/StrictEdge";
import { EdgePath, getEdgePath } from "../../../model/edge/EdgePath";
import { EdgePathStyle } from "../../../model/edge/EdgePathStyle";

export default function EdgeDefault(props: EdgeProps<EdgeData>): React.JSX.Element {
    const edgePathStyle: EdgePathStyle = useStore((state: State) => state.flow.edgePathStyle);
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

