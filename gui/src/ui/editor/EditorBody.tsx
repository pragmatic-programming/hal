import React from "react";
import { LanguageIndicator } from "../../model/node/LanguageIndicator";
import Editor, { loader, OnChange } from "@monaco-editor/react";

interface Props {
    height: string;
    language: LanguageIndicator;
    onChange: OnChange;
    value: string | undefined;
    width: string;
}

// Monaco Editor is downloaded from CDN as default, see https://github.com/suren-atoyan/monaco-react/issues/12
// We want to server the Monaco Editor from localhost instead
// @monaco-editor/react is not compatible with Apps created by "Create React App", see https://github.com/suren-atoyan/monaco-react#use-monaco-editor-as-an-npm-package
// Thus, we require a workaround, inspired by https://github.com/suren-atoyan/monaco-react/issues/12#issuecomment-1801079666
// We copy the required files (from "vs") with the following command to the public folder: "cp -r node_modules/monaco-editor/min/vs ./public/"
// The last step is required for everytime when devDependency "monaco-editor" is updated
// Furthermore, we have to configure the loader and tell it find the files in "/vs"

// We also need to provide the opportunity to set this to the correct VSCode
// resource URI when used in a WebView.
// Instead of casting to any, we should consider extending the global Window interface
// (cf. https://stackoverflow.com/questions/12709074/how-do-you-explicitly-set-a-new-property-on-window-in-typescript)
// noinspection JSUnresolvedReference
loader.config({
    paths: {
        vs: (window as any).__monacoLoadUri || "/hal/vs"
    },
});

export function EditorBody(props: Props) {
    return (
        <Editor
            className="nodrag"
            height={props.height}
            language={props.language.toLowerCase()}
            onChange={props.onChange}
            options={{
                minimap: {enabled: false},
                renderLineHighlight: "none",
                overviewRulerBorder: false,
                overviewRulerLanes: 0,
                scrollbar: {
                    horizontal: "auto",
                    vertical: "hidden",
                }
            }}
            value={props.value}
            width={props.width}
        />
    );
}
