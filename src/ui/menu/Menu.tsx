import React from "react";
import ButtonPlay from "./ButtonPlay";
import MenuLayout from "./MenuLayout";
import MenuDivider from "./MenuDivider";
import ButtonSwitchMode from "./ButtonSwitchMode";
import { BoxBackgroundMain } from "../util/BoxBackgroundMain";
import { bottomHeight } from "../bottom/Bottom";

export const menuWidth = 100;

export default function Menu(): React.JSX.Element {
    return (
        <BoxBackgroundMain
            border="right"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: menuWidth - 1, // subtract 1px which is added by borderRight
                height: "calc(100vh - " + bottomHeight + "px)",
            }}>
            <ButtonSwitchMode/>
            <MenuDivider/>
            <ButtonPlay/>
            <MenuDivider/>
            <MenuLayout/>
        </BoxBackgroundMain>
    );
}
