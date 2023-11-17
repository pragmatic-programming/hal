import React, { CSSProperties } from "react";
import { Edge, NodeProps, NodeResizer, useEdges, useReactFlow } from "reactflow";
import { Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import EditorHeader, { editorHeaderHeight } from "../../editor/EditorHeader";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import EditorFooter, { editorFooterHeight } from "../../editor/EditorFooter";
import { EditorBody } from "../../editor/EditorBody";
import { NodeData } from "../../../model/node/NodeData";
import { borderColor } from "../../../util";
import HandleTargetTop from "../handle/HandleTargetTop";
import HandleTargetLeft from "../handle/HandleTargetLeft";
import HandleSourceRight from "../handle/HandleSourceRight";
import HandleSourceBottom from "../handle/HandleSourceBottom";
import { strictNode } from "../../../model/node/StrictNode";
import { EdgeData } from "../../../model/edge/EdgeData";

const editorBodyReducedWidth = 2;
const editorBodyReducedHeight = editorHeaderHeight + editorFooterHeight;


export default function NodeEditor(props: NodeProps<NodeData>): React.JSX.Element {
    const reactFlow = useReactFlow();
    const node = strictNode(reactFlow.getNode(props.id));
    if (props.data.type !== "editor") {
        throw new Error("Node.data has wrong type");
    }
    const setNodeNodeDataLabel = useStore((state: State) => state.reactFlow.setNodeNodeDataLabel);
    const setNodeNodeDataContent = useStore((state: State) => state.reactFlow.setNodeNodeDataContent);
    const theme: Theme = useTheme();
    let handeStyle: CSSProperties = {};
    let lineStyle: CSSProperties = {
        borderColor: borderColor(props, theme, theme.palette.primary.dark),
    };
    // todo find a better solution than set the handleStyle
    if (!props.selected) {
        handeStyle = {
            width: 2,
            height: 2,
            backgroundColor: borderColor(props, theme, theme.palette.primary.dark),
            border: "none",
        };
    }
    const edges: Edge<EdgeData>[] = useEdges();
    const targetEdgeTop: Edge | undefined = edges.find(edge => edge.target === props.id && edge.targetHandle === "top");
    const targetEdgeLeft: Edge | undefined = edges.find(edge => edge.target === props.id && edge.targetHandle === "left");
    return (
        <BoxBackgroundMain
            style={{
                width: node.width,
                height: node.height,
            }}
        >
            <NodeResizer
                handleStyle={handeStyle}
                lineStyle={lineStyle}
                minHeight={30}
                minWidth={100}
            />
            <HandleTargetTop
                isConnected={targetEdgeTop !== undefined}
                nodeId={props.id}
            />
            <HandleTargetLeft
                isConnected={targetEdgeLeft !== undefined}
                nodeId={props.id}
            />
            <HandleSourceRight/>
            <HandleSourceBottom/>
            <EditorHeader
                value={props.data.label}
                onChange={(label: string) => setNodeNodeDataLabel(props.id, label)}
                nodeId={props.id}
            />
            <EditorBody
                height={"calc(100% - " + editorBodyReducedHeight + "px)"}
                language={props.data.language}
                onChange={(content: string | undefined) => setNodeNodeDataContent(props.id, content)}
                value={props.data.content}
                width={"calc(100% - " + editorBodyReducedWidth + "px)"}
            />
            <EditorFooter
                nodeId={props.id}
                language={props.data.language}
            />
        </BoxBackgroundMain>
    );
}
