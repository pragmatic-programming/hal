import React, { useState } from "react";

interface Props {
    on: React.JSX.Element;
    off: React.JSX.Element;
}

export function Hover(props: Props): React.JSX.Element {
    const [on, setOn] = useState<boolean>(false);
    return (
        <div
            onMouseEnter={() => setOn(true)}
            onMouseLeave={() => setOn(false)}
        >
            {on ? props.on : props.off}
        </div>
    );
}
