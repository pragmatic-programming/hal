import React from "react";
import Menu from "./ui/menu/Menu";
import Theme from "./ui/Theme";
import Bottom from "./ui/bottom/Bottom";
import { ReactFlowProvider } from "reactflow";
import Flow from "./ui/flow/Flow";
import EditorFullSize from "./ui/editor/EditorFullSize";
import { State } from "./state/State";
import { useStore } from "./state/Store";
import { Alert, Snackbar } from "@mui/material";
import { StateEditorOpen } from "./state/editor/StateEditor";

export default function App(): React.JSX.Element {
    const stateEditorOpen: StateEditorOpen | undefined = useStore((state: State) => state.editor.open);
    const content: string | undefined = useStore((state: State) => state.ui.message.content);
    const severity: "success" | "error"  = useStore((state: State) => state.ui.message.severity);
    const closeSnackBar: () => void = useStore((state: State) => () => state.ui.message.setContent(undefined));
    let editor = undefined;
    if (stateEditorOpen) {
        editor = <EditorFullSize editorState={stateEditorOpen}/>;
    }
    return (
        <Theme>
            <ReactFlowProvider>
                <Flow/>
                <Menu/>
                <Bottom/>
                {editor}
                <Snackbar
                    anchorOrigin={{horizontal: "right", vertical: "top"}}
                    autoHideDuration={6000}
                    onClose={closeSnackBar}
                    open={content !== undefined}
                >
                    <Alert severity={severity}>{content}</Alert>
                </Snackbar>
            </ReactFlowProvider>
        </Theme>
    );
}

