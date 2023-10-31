import React from "react";
import ButtonPlay from "./ButtonPlay";
import { gui } from "../../constants";
import MenuLayout from "./MenuLayout";
import MenuDivider from "./MenuDivider";
import ButtonSwitchMode from "./ButtonSwitchMode";
import { BoxBackgroundMain } from "../BoxBackgroundMain";

export default function Menu(): React.JSX.Element {
    return (
        <BoxBackgroundMain
            border="right"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: gui.menuWidth - 1, // subtract 1px which is added by borderRight
                height: "calc(100vh - " + gui.bottomHeight + "px)",
            }}>
            <ButtonSwitchMode/>
            <MenuDivider/>
            <ButtonPlay/>
            <MenuDivider/>
            <MenuLayout/>
        </BoxBackgroundMain>
    );
}
