import { Box, styled, TextField } from "@mui/material";
import React from "react";
import { InsertDriveFile } from "@mui/icons-material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { useReactFlow } from "reactflow";

interface Props {
    nodeId: string,
    nodeLabel: string,
}

const EditorNodeLabelTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none"
        },
    },
});

export function EditorNodeHeader(props: Props): React.JSX.Element {
    const {getNode} = useReactFlow();
    const setNodeLabel = useStore((state: State) => state.setNodeLabel);
    return (
        <Box
            sx={{
                alignItems: "center",
                // todo should come from theme
                backgroundColor: "#ffffff",
                display: "flex",
                mr: 5,
                pb: .5,
                pl: 1,
                pt: .5,
            }}
        >
            <InsertDriveFile
                sx={{color: "action.active"}}
            />
            <EditorNodeLabelTextField
                size="small"
                value={props.nodeLabel}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setNodeLabel(getNode, props.nodeId, event.target.value);
                }}
            />
        </Box>
    );
}
