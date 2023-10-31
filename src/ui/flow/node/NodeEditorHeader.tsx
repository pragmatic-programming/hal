import { Box, styled, TextField } from "@mui/material";
import React from "react";
import { InsertDriveFile } from "@mui/icons-material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { Node, useReactFlow } from "reactflow";
import NodeData from "../../../model/NodeData";

interface Props {
    nodeId: string,
    value: string | undefined,
    onChange: (content: string) => void,
}

export const EditorNodeLabelTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none"
        },
    },
});

export default function NodeEditorHeader(props: Props): React.JSX.Element {
    const openEditor = useStore((state: State) => state.openEditor);
    const {getNode} = useReactFlow();
    let node: Node<NodeData> | undefined = getNode(props.nodeId);
    if (!node) {
        throw new Error("Node is undefined");
    }
    return (
        <Box
            sx={{
                alignItems: "center",
                // todo should come from theme
                backgroundColor: "#ffffff",
                display: "flex",
                mr: 6,
                pb: .5,
                pl: 1,
                pt: .5,
            }}
        >
            <InsertDriveFile
                onClick={() => openEditor(getNode, props.nodeId)}
                sx={{color: "action.active"}}
            />
            <EditorNodeLabelTextField
                size="small"
                value={props.value}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {props.onChange(event.target.value);}}
            />
        </Box>
    );
}
