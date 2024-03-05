import React from "react";
import MenuButtonPlay from "./MenuButtonPlay";
import MenuDivider from "./MenuDivider";
import { BoxBackgroundMain } from "../util/BoxBackgroundMain";
import { bottomHeight } from "../bottom/Bottom";
import MenuExamples from "./examples/MenuExamples";
import MenuButtonImmediatePlay from "./MenuButtonImmediatePlay";
import MenuLayouts from "./layouts/MenuLayouts";
import MenuButtonAddNodeCreate from "./MenuButtonAddNodeCreate";
import MenuButtonImport from "./MenuButtonImport";
import MenuButtonExport from "./MenuButtonExport";
import MenuButtonVerboseMode from "./MenuButtonVerboseMode";
import MenuButtonHierarchyMode from "./MenuButtonHierarchyMode";

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
            <MenuButtonAddNodeCreate/>
            <MenuDivider/>
            <MenuButtonPlay/>
            <MenuButtonImmediatePlay/>
            <MenuDivider/>
            <MenuButtonHierarchyMode/>
            <MenuLayouts/>
            <MenuDivider/>
            <MenuButtonImport/>
            <MenuButtonExport/>
            <MenuDivider/>
            <MenuButtonVerboseMode/>
        </BoxBackgroundMain>
    );
}
