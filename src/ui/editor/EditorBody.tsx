import { Editor as Monaco, OnChange } from "@monaco-editor/react";
import React from "react";

interface Props {
    height: string
    language: "JavaScript"
    onChange: OnChange
    value: string | undefined
    width: string
}

export function EditorBody(props: Props) {
    return (
        <Monaco
            defaultLanguage={props.language.toLowerCase()}
            height={props.height}
            onChange={props.onChange}
            options={{minimap: {enabled: false}}}
            value={props.value}
        />
    );
}
