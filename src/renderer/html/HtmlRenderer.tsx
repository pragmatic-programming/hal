import React from "react";
import { Editor } from "../../model/Editor";
import { EditorRenderer } from "./EditorRenderer";

interface Props {
    editors: Editor[];
    highlightedEditorId: number | null;
    leftOffset: number;
    setHighlightedEditorId: (id: number | null) => void;
}

export default function HtmlRenderer(props: Props): React.JSX.Element {
    return (
        <div className={"canvas"}>
            {props.editors.map((editor: Editor) => <EditorRenderer
                editor={editor}
                highlightedEditorId={props.highlightedEditorId}
                key={editor.id}
                leftOffset={props.leftOffset}
                setHighlightedEditorId={props.setHighlightedEditorId}
            />)}
        </div>
    );
}
