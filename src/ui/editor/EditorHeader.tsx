import React from "react";
import { InsertDriveFile } from "@mui/icons-material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { useReactFlow } from "reactflow";
import { NodeData } from "../../model/node/NodeData";
import { BoxBackgroundLight } from "../util/BoxBackgroundLight";
import { EditorHeaderLabel } from "./EditorHeaderLabel";
import { strictNode, StrictNode } from "../../model/node/StrictNode";

interface Props {
    nodeId: string,
    value: string | undefined,
    onChange: (content: string) => void,
}


export const editorHeaderHeight = 46;

export default function EditorHeader(props: Props): React.JSX.Element {
    const openEditor = useStore((state: State) => state.editor.editorOpen);
    const reactFlow = useReactFlow();
    const node: StrictNode<NodeData> = strictNode(reactFlow.getNode(props.nodeId));
    if (node.data.type !== "editor") {
        throw new Error("Node has wrong type");
    }
    return (
        <BoxBackgroundLight
            style={{
                alignItems: "center",
                display: "flex",
                height: editorHeaderHeight,
                marginRight: 46,
                paddingLeft: 8,
            }}
        >
            <InsertDriveFile
                onClick={() => openEditor(reactFlow.getNode, props.nodeId)}
                sx={{color: "action.active"}}
            />
            <EditorHeaderLabel
                size="small"
                value={props.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.onChange(event.target.value);
                }}
            />
        </BoxBackgroundLight>
    );
}
