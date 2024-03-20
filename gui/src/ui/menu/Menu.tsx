import React from "react";
import MenuDivider from "./MenuDivider";
import { BoxBackgroundMain } from "../util/BoxBackgroundMain";
import { bottomHeight } from "../bottom/Bottom";
import MenuExamples from "./examples/MenuExamples";
import MenuButtonImmediatePlay from "./MenuButtonImmediatePlay";
import MenuLayouts from "./layouts/MenuLayouts";
import MenuButtonAddNodeCreate from "./MenuButtonAddNodeCreate";
import MenuButtonImport from "./MenuButtonImport";
import MenuButtonExport from "./MenuButtonExport";
import MenuButtonMode from "./MenuButtonMode";
import MenuButtonHierarchyMode from "./MenuButtonHierarchyMode";
import MenuCompilations from "./compilations/MenuCompilations";
import { Stack } from "@mui/material";
import MenuButtonDelete from "./MenuButtonDelete";

export const menuWidth: number = 100;
const paddingY = 10;
const height = "calc(100vh - " + (bottomHeight + 2 * paddingY) + "px)";

export default function Menu(): React.JSX.Element {
    return (
        <BoxBackgroundMain
            border="right"
            style={{
                position: "fixed",
                paddingTop: paddingY,
                paddingBottom: paddingY,
                top: 0,
                left: 0,
                width: menuWidth - 1, // subtract 1px which is added by borderRight
                height: height,
            }}>
            <Stack
                direction={"column"}
                justifyContent={"space-between"}
                alignItems={"center"}
                spacing={2}
                style={{
                    height: height,
                }}
            >
                <div>
                    <MenuExamples/>
                    <MenuDivider/>
                    <MenuButtonAddNodeCreate/>
                    <MenuDivider/>
                    <MenuCompilations/>
                    <MenuButtonImmediatePlay/>
                    <MenuDivider/>
                    <MenuButtonHierarchyMode/>
                    <MenuLayouts/>
                    <MenuDivider/>
                    <MenuButtonImport/>
                    <MenuButtonExport/>
                    <MenuDivider/>
                    <MenuButtonMode/>
                </div>
                <div>
                    <MenuButtonDelete/>
                </div>
            </Stack>
        </BoxBackgroundMain>
    );
}
