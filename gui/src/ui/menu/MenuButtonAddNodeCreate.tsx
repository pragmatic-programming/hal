import React from "react";
import { Add } from "@mui/icons-material";
import MenuButton from "./MenuButton";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export default function MenuButtonAddNodeCreate(): React.JSX.Element {
    const addNodeCreate = useStore((state: State) => state.flow.addNodeCreate);
    return (
        <MenuButton
            onClick={addNodeCreate}
            icon={<Add/>}
            tooltip="New Create Node"
        />
    );
}
