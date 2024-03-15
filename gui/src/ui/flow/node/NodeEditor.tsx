import React from "react";
import { NodeProps, NodeResizer, ReactFlowInstance, useReactFlow } from "reactflow";
import { NodeData } from "../../../model/node/NodeData";
import HandleTargetTop from "../handle/HandleTargetTop";
import HandleTargetLeft from "../handle/HandleTargetLeft";
import HandleSourceRight from "../handle/HandleSourceRight";
import HandleSourceBottom from "../handle/HandleSourceBottom";
import { StrictNode, strictNode } from "../../../model/node/StrictNode";
import NodeEditorBorder from "./NodeEditorBorder";
import { NodeEditorBody } from "./NodeEditorBody";


export default function NodeEditor(props: NodeProps<NodeData>): React.JSX.Element {
    if (props.data.type !== "editor") {
        throw new Error("Node.data has wrong type");
    }
    const reactFlow: ReactFlowInstance = useReactFlow();
    const node: StrictNode<NodeData> = strictNode(reactFlow.getNode(props.id));
    const resizerIsVisible: boolean = props.selected;
    return (
        <NodeEditorBorder
            height={node.height}
            sourceNodeStatus={props.data.status}
            visible={!resizerIsVisible}
            width={node.width}
        >
            <NodeResizer
                isVisible={resizerIsVisible}
                minHeight={30}
                minWidth={100}
            />
            <HandleTargetTop
                nodeId={props.id}
            />
            <HandleTargetLeft
                nodeId={props.id}
            />
            <HandleSourceRight
                nodeId={props.id}
            />
            <HandleSourceBottom
                nodeId={props.id}
            />
            <NodeEditorBody
                {...props}
            />
        </NodeEditorBorder>
    );
}
