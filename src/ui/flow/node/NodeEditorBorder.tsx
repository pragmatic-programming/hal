import React from "react";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";

interface Props {
    children: React.ReactNode;
    visible: boolean;
    width: number;
    height: number;
}

export default function NodeEditorBorder(props: Props): React.JSX.Element {
    let width: number = props.width;
    let height: number = props.height;
    let border: "top-bottom-left-right" | undefined = undefined;
    if (props.visible) {
        // if we are not reducing the width and height by 2px when visible (border adds 2px for each dimension),
        // the node automatically grows when moved
        width -= 2;
        height -= 2;
        border = "top-bottom-left-right";
    }
    return (
        <BoxBackgroundMain
            border={border}
            style={{
                width: width,
                height: height,
            }}
        >
            {props.children}
        </BoxBackgroundMain>
    );
}
