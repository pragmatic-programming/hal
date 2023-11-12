import React from "react";
import Menu from "./ui/menu/Menu";
import Theme from "./ui/Theme";
import Bottom from "./ui/bottom/Bottom";
import { ReactFlowProvider } from "reactflow";
import Flow from "./ui/flow/flow/Flow";
import EditorFullSize from "./ui/editor/EditorFullSize";
import { State } from "./state/State";
import { useStore } from "./state/Store";

export default function App(): React.JSX.Element {
    const stateEditorOpen = useStore((state: State) => state.editor.open);
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
            </ReactFlowProvider>
        </Theme>
    );
}

