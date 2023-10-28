import React from "react";
import Menu from "./ui/menu/Menu";
import Theme from "./ui/Theme";
import Bottom from "./ui/bottom/Bottom";
import { ReactFlowProvider } from "reactflow";
import Flow from "./ui/flow/Flow";
import Editor from "./ui/Editor";
import { State } from "./state/State";
import { useStore } from "./state/Store";

export default function App(): React.JSX.Element {
    const editorOpen = useStore((state: State) => state.editorOpen);
    let element = undefined;
    if (editorOpen) {
        element = <Editor editorOpen={editorOpen}/>;
    }
    return (
        <Theme>
            <ReactFlowProvider>
                <Flow/>
                <Menu/>
                <Bottom/>
                {element}
            </ReactFlowProvider>
        </Theme>
    );
}

