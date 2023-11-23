import React from "react";
import { BoxBackgroundLight } from "../util/BoxBackgroundLight";
import { EditorHeaderLabel } from "./EditorHeaderLabel";

interface Props {
    nodeId: string,
    value: string | undefined,
    onChange: (content: string) => void,
    iconLeft: React.JSX.Element
    iconRight: React.JSX.Element
}

export const editorHeaderHeight = 46;

export default function EditorHeader(props: Props): React.JSX.Element {
    return (
        <BoxBackgroundLight
            style={{
                alignItems: "center",
                display: "flex",
                height: editorHeaderHeight,
            }}
        >
            {props.iconLeft}
            <EditorHeaderLabel
                className="nodrag"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.onChange(event.target.value)}
                size="small"
                value={props.value}
                fullWidth={true}
            />
            {props.iconRight}
        </BoxBackgroundLight>
    );
}
