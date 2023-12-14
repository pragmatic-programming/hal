import React from "react";
import ButtonPlay from "./ButtonPlay";
import MenuDivider from "./MenuDivider";
import { BoxBackgroundMain } from "../util/BoxBackgroundMain";
import { bottomHeight } from "../bottom/Bottom";
import MenuExamples from "./examples/MenuExamples";
import ButtonImmediatePlay from "./ButtonImmediatePlay";
import MenuLayouts from "./layouts/MenuLayouts";
import ButtonAddNodeCreate from "./ButtonAddNodeCreate";
import ButtonImport from "./ButtonImport";
import ButtonExport from "./ButtonExport";

export const menuWidth: number = 100;

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
            <MenuExamples/>
            <MenuDivider/>
            <ButtonAddNodeCreate/>
            <MenuDivider/>
            <ButtonPlay/>
            <ButtonImmediatePlay/>
            <MenuDivider/>
            <MenuLayouts/>
            <MenuDivider/>
            <ButtonImport/>
            <ButtonExport/>
        </BoxBackgroundMain>
    );
}
