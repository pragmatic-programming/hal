import { Editor as Monaco, OnChange } from "@monaco-editor/react";
import React from "react";
import { Language } from "../../model/Languages";

interface Props {
    height: string;
    language: Language;
    onChange: OnChange;
    value: string | undefined;
    width: string;
}

export function EditorBody(props: Props) {
    return (
        <Monaco
            height={props.height}
            language={props.language.toLowerCase()}
            onChange={props.onChange}
            options={{minimap: {enabled: false}}}
            value={props.value}
            width={props.width}
        />
    );
}
