import React from "react";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import MenuButton from "./MenuButton";
import { AddBox } from "@mui/icons-material";


export default function OpenDrawerButton(): React.JSX.Element {
    const toggleDrawer = useStore((state: State) => state.toggleDrawer);
    return (
        <MenuButton
            onClick={toggleDrawer}
            icon={<AddBox fontSize="inherit"/>}
            tooltip={"Open New Node Menu"}
        />
    );
}
