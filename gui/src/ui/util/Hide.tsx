import React from "react";

interface Props {
    hide: boolean;
    children: React.JSX.Element;
}

export function Hide(props: Props): React.JSX.Element | null {
    if (props.hide) {
        return null;
    }
    return props.children;
}
