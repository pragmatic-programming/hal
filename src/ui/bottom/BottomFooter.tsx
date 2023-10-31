import React from "react";
import { BoxBackgroundMain } from "../BoxBackgroundMain";
import BottomFooterLeft from "./BottomFooterLeft";
import BottomFooterRight from "./BottomFooterRight";

export function BottomFooter(): React.JSX.Element {
    return (
        <BoxBackgroundMain
            border="top"
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bottom: 0,
                paddingLeft: 10,
                paddingRight: 5,
                height: 36,
                position: "fixed",
                width: "calc(100% - 15px)",
            }}
        >
            <BottomFooterLeft/>
            <BottomFooterRight/>
        </BoxBackgroundMain>
    );
}
