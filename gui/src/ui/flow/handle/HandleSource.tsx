import { Edge, Position, useEdges } from "reactflow";
import React, { CSSProperties } from "react";
import HandleStyled from "./HandleStyled";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { SourceHandleId } from "../../../model/edge/SourceHandleId";
import { EdgeData } from "../../../model/edge/EdgeData";

interface Props {
    id: SourceHandleId;
    nodeId: string;
    position: Position;
    style?: CSSProperties;
}

export default function HandleSource(props: Props): React.JSX.Element {
    const isConnected: boolean = useEdges<EdgeData>()
        .find((edge: Edge<EdgeData>) => edge.source === props.nodeId && edge.sourceHandle === props.id) !== undefined;
    const showHandle: boolean = useStore((state: State) => (
        // handle is an active source during a connection
        state.flow.connectingSourceNodeId === props.nodeId &&
        state.flow.connectingSourceHandleId === props.id
    ) || (
        // no active connection
        state.flow.connectingSourceNodeId === null &&
        state.flow.connectingSourceHandleId === null
    ));
    const style: CSSProperties = {};
    const hidden: boolean = !isConnected && !showHandle;
    if (hidden) {
        style.visibility = "hidden";
    }
    return (
        <HandleStyled
            style={style}
            type="source"
            {...props}
        />
    );
}
