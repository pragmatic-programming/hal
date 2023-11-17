import React from "react";
import { BoxBackgroundMain } from "../util/BoxBackgroundMain";
import BottomFooterLeft from "./BottomFooterLeft";
import BottomFooterRight from "./BottomFooterRight";

export const bottomFooterHeight = 36;

export function BottomFooter(): React.JSX.Element {
    return (
        <BoxBackgroundMain
            border="top"
            style={{
                alignItems: "center",
                bottom: 0,
                display: "flex",
                height: bottomFooterHeight,
                justifyContent: "space-between",
                position: "fixed",
                width: "100%",
            }}
        >
            <BottomFooterLeft/>
            <BottomFooterRight/>
        </BoxBackgroundMain>
    );
}
