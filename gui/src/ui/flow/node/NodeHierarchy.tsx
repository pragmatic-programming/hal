import React, { CSSProperties } from "react";
import { NodeProps } from "reactflow";
import HandleTargetTop from "../handle/HandleTargetTop";
import HandleTargetLeft from "../handle/HandleTargetLeft";
import HandleSourceRight from "../handle/HandleSourceRight";
import HandleSourceBottom from "../handle/HandleSourceBottom";
import { NodeDataHierarchy } from "../../../model/node/NodeData";

export default function NodeHierarchy(props: NodeProps<NodeDataHierarchy>): React.JSX.Element {
    let style: CSSProperties = {
        borderColor: "#000000",
        borderStyle: "solid",
        borderWidth: 1,
        width: props.data.width,
        height: props.data.height,
    };
    return (
        <div
            style={style}
        >
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
        </div>
    );
}
