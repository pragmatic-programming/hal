import React from "react";
import { Editor } from "../../model/Editor";
import { EditorRenderer } from "./EditorRenderer";

interface Props {
    editors: Editor[];
}

export default function HtmlRenderer(props: Props): JSX.Element {
    return (
        <div className={"canvas"}>
            {props.editors.map((editor: Editor) => <EditorRenderer key={editor.id} editor={editor}/>)}
        </div>
    );
}
