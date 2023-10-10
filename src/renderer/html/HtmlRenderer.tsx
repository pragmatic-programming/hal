import React from "react";
import { Editor } from "../../model/Editor";
import { EditorRenderer } from "./EditorRenderer";

interface Props {
    editors: Editor[];
    leftOffset: number;
}

export default function HtmlRenderer(props: Props): JSX.Element {
    return (
        <div className={"canvas"}>
            {props.editors.map((editor: Editor) => <EditorRenderer key={editor.id} editor={editor}
                                                                   leftOffset={props.leftOffset}/>)}
        </div>
    );
}
