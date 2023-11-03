import { styled, TextField } from "@mui/material";
import React from "react";
import { InsertDriveFile } from "@mui/icons-material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { Node, useReactFlow } from "reactflow";
import NodeData from "../../model/NodeData";
import { BoxBackgroundLight } from "../util/BoxBackgroundLight";

interface Props {
    nodeId: string,
    value: string | undefined,
    onChange: (content: string) => void,
}

const EditorNodeLabelTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none"
        },
    },
});

export const editorHeaderHeight = 46;

export default function EditorHeader(props: Props): React.JSX.Element {
    const openEditor = useStore((state: State) => state.editor.editorOpen);
    const {getNode} = useReactFlow();
    let node: Node<NodeData> | undefined = getNode(props.nodeId);
    if (!node) {
        throw new Error("Node is undefined");
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
                onClick={() => openEditor(getNode, props.nodeId)}
                sx={{color: "action.active"}}
            />
            <EditorNodeLabelTextField
                size="small"
                value={props.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    props.onChange(event.target.value);
                }}
            />
        </BoxBackgroundLight>
    );
}
