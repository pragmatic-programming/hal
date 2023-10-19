import React from "react";
import { Editor } from "../../model/Editor";
import { useStore } from "../../Store";
import { State } from "../../State";

interface Props {
    editor: Editor;
}

export function EditorRenderer(props: Props): React.JSX.Element {
    const updateEditorValue = useStore((state: State) => state.updateEditorValue);
    return (
        <></>
    );
}
