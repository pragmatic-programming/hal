import React, { CSSProperties } from "react";
import { NodeProps, NodeResizer, useReactFlow } from "reactflow";
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
import { StrictNode, strictNode } from "../../../model/node/StrictNode";

const editorBodyReducedWidth: number = 2;
const editorBodyReducedHeight: number = editorHeaderHeight + editorFooterHeight;


export default function NodeEditor(props: NodeProps<NodeData>): React.JSX.Element {
    if (props.data.type !== "editor") {
        throw new Error("Node.data has wrong type");
    }
    const node: StrictNode<NodeData> = strictNode(useReactFlow().getNode(props.id));
    const setNodeNodeDataLabel = useStore((state: State) => state.reactFlow.setNodeNodeDataLabel);
    const setNodeNodeDataContent = useStore((state: State) => state.reactFlow.setNodeNodeDataContent);
    const theme: Theme = useTheme();
    const lineStyle: CSSProperties = {
        borderColor: borderColor(props, theme, theme.palette.primary.dark),
    };
    // todo find a better solution than set the handleStyle
    const handeStyle: CSSProperties = {};
    if (!props.selected) {
        handeStyle.width = 2;
        handeStyle.height = 2;
        handeStyle.backgroundColor = borderColor(props, theme, theme.palette.primary.dark);
        handeStyle.border = "none";
    }
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
                nodeId={props.id}
            />
            <HandleTargetLeft
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
