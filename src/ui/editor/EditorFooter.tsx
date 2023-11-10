import React from "react";
import { BoxBackgroundLight } from "../util/BoxBackgroundLight";
import EditorFooterLanguageSelect from "./EditorFooterLanguageSelect";
import { LanguageIndicator } from "../../model/node/LanguageIndicator";

interface Props {
    nodeId: string;
    language: LanguageIndicator;
}

export const editorFooterHeight = 36;

export default function EditorFooter(props: Props): React.JSX.Element {
    return (
        <BoxBackgroundLight
            border="top"
            style={{
                alignItems: "center",
                display: "flex",
                height: editorFooterHeight - 1, // reduce height by 1 since top border is set
                paddingLeft: 10,
                paddingRight: 46,
            }}
        >
            <EditorFooterLanguageSelect
                nodeId={props.nodeId}
                language={props.language}
            />
        </BoxBackgroundLight>
    );
}
