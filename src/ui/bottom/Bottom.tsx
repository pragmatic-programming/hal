import React from "react";
import "./Bottom.scss";
import { BoxBackgroundMain } from "../util/BoxBackgroundMain";
import { BottomFooter } from "./BottomFooter";
import { BottomBody } from "./BottomBody";

export const bottomHeight = 150;

export default function Bottom(): React.JSX.Element {
    return (
        <BoxBackgroundMain
            border="top"
            style={{
                bottom: 0,
                height: bottomHeight,
                left: 0,
                position: "fixed",
                width: "100%",
            }}
        >
            <BottomBody/>
            <BottomFooter/>
        </BoxBackgroundMain>
    );
}
