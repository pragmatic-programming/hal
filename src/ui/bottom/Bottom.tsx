import React from "react";
import "./Bottom.scss";
import { BoxBackgroundMain } from "../BoxBackgroundMain";
import { BottomFooter } from "./BottomFooter";
import { BottomBody } from "./BottomBody";

export const bottomHeight = 150;

export default function Bottom(): React.JSX.Element {
    return (
        <BoxBackgroundMain
            border="top"
            style={{
                bottom: 0,
                // reduce bottomHeight by 4px, since paddingBottom and paddingTop will add 2px each
                height: bottomHeight - 4,
                left: 0,
                paddingBottom: 2,
                paddingLeft: 0,
                paddingRight: 5,
                paddingTop: 2,
                position: "fixed",
                width: "calc(100vw - " + 5 + "px)",
            }}
        >
            <BottomBody/>
            <BottomFooter/>
        </BoxBackgroundMain>
    );
}
