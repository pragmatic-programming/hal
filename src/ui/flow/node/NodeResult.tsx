import React from "react";
import { NodeProps, NodeResizer, useReactFlow } from "reactflow";
import HandleTarget from "../handle/HandleTarget";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { NodeDataResult } from "../../../model/node/NodeData";

export default function NodeResult(props: NodeProps<NodeDataResult>): React.JSX.Element {
    if (!props.targetPosition) {
        throw new Error("TargetPosition is undefined");
    }
    const {getNode} = useReactFlow();
    const node = getNode(props.id);
    if (!node) {
        throw new Error("Node is undefined");
    }
    if (!node.height) {
        throw new Error("Node.height is undefined");
    }
    if (!node.width) {
        throw new Error("Node.width is undefined");
    }
    return (
        <>
            <NodeResizer minWidth={100} minHeight={30}/>
            <HandleTarget
                nodeId={props.id}
                position={props.targetPosition}
            />
            <BoxBackgroundMain
                style={{
                    height: node.height,
                    width: node.width,
                }}
            >
            </BoxBackgroundMain>
        </>
    );
}
