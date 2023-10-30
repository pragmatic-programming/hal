import React from "react";
import Menu from "./ui/menu/Menu";
import Theme from "./ui/Theme";
import Bottom from "./ui/bottom/Bottom";
import { ReactFlowProvider } from "reactflow";
import Flow from "./ui/flow/flow/Flow";
import Editor from "./ui/Editor";
import { State } from "./state/State";
import { useStore } from "./state/Store";
import NewNodeDialog from "./ui/NewNodeDialog";

export default function App(): React.JSX.Element {
    const editorOpen = useStore((state: State) => state.editorOpen);
    let editor = undefined;
    if (editorOpen) {
        editor = <Editor editorOpen={editorOpen}/>;
    }
    const newNodeDialogOpen = useStore((state: State) => state.newNodeDialogOpen);
    let newNodeDialog = undefined;
    if (newNodeDialogOpen) {
        newNodeDialog = <NewNodeDialog newNodeDialogOpen={newNodeDialogOpen}/>;
    }
    return (
        <Theme>
            <ReactFlowProvider>
                <Flow/>
                <Menu/>
                <Bottom/>
                {newNodeDialog}
                {editor}
            </ReactFlowProvider>
        </Theme>
    );
}

