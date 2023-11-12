import React, { CSSProperties } from "react";

interface Props {
    borderColor: string,
    visible?: boolean,
    children: React.ReactNode;
}

export function BoxBorder(props: Props): React.JSX.Element {
    let style: CSSProperties = {
        borderColor: props.borderColor,
        borderStyle: "solid",
        borderWidth: 1,
    };
    if (props.visible === false) {
        style = {};
    }
    return (
        <div
            style={style}
        >
            {props.children}
        </div>
    );
}
