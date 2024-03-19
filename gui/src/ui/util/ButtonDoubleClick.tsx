import React, { useRef } from "react";
import useDoubleClick from "use-double-click";
import ButtonIconTooltip from "./ButtonIconTooltip";
import MenuButtonBox from "../menu/MenuButtonBox";

interface Props {
    disabled?: boolean;
    icon: React.JSX.Element;
    onClick: () => void;
    onDoubleClick: () => void;
    size: "small" | "medium" | "large";
    tooltip: string;
}

export default function ButtonDoubleClick(props: Props): React.JSX.Element {
    // see https://www.timellenberger.com/libraries/use-double-click
    const buttonRef = useRef(null);
    useDoubleClick({
        /** A callback function for single click events */
        onSingleClick: e => props.onClick(),
        /** A callback function for double click events */
        onDoubleClick: e => props.onDoubleClick(),
        /** (Required) Dom node to watch for double clicks */
        ref: buttonRef,
        /**
         * The amount of time (in milliseconds) to wait
         * before differentiating a single from a double click
         */
        latency: 200
    });
    return (
        <MenuButtonBox>
            <ButtonIconTooltip
                buttonRef={buttonRef}
                disabled={props.disabled}
                placement={"right"}
                size={props.size}
                title={props.tooltip}
            >
                {props.icon}
            </ButtonIconTooltip>
        </MenuButtonBox>
    );
}
