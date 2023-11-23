import { Editor as Monaco, OnChange } from "@monaco-editor/react";
import React from "react";
import { LanguageIndicator } from "../../model/node/LanguageIndicator";

interface Props {
    height: string;
    language: LanguageIndicator;
    onChange: OnChange;
    value: string | undefined;
    width: string;
}

export function EditorBody(props: Props) {
    return (
        <Monaco
            className="nodrag"
            height={props.height}
            language={props.language.toLowerCase()}
            onChange={props.onChange}
            options={{minimap: {enabled: false}}}
            value={props.value}
            width={props.width}
        />
    );
}
