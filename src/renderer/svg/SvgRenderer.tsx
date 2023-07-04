import { Edge } from "../../model/Edge";
import React from "react";
import LineRenderer from "./LineRenderer";
import { Editor } from "../../model/Editor";

interface Props {
    editors: Editor[];
}

export default function SvgRenderer(props: Props): JSX.Element {
    return (
        <svg>
            <defs>
                <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="4"
                    markerHeight="4"
                    orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z"/>
                </marker>
            </defs>
            {
                props.editors
                    .flatMap(editor => editor.edges)
                    .map((edge: Edge) => <LineRenderer key={edge.key} edge={edge}/>)
            }
        </svg>
    );
}
