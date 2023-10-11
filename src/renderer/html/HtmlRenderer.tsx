import React from "react";
import { Editor } from "../../model/Editor";
import { EditorRenderer } from "./EditorRenderer";
import { useStore } from "../../Store";
import { State } from "../../State";

export default function HtmlRenderer(): React.JSX.Element {
    const editors: Editor[] = useStore((state: State) => state.canvas.editors);
    return (
        <div className={"canvas"}>
            {editors.map((editor: Editor) => <EditorRenderer
                editor={editor}
                key={editor.id}
            />)}
        </div>
    );
}
