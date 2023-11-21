import React from "react";
import { Add } from "@mui/icons-material";
import ButtonMenu from "./ButtonMenu";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";

export default function ButtonAddNodeCreate(): React.JSX.Element {
    const addNodeCreate = useStore((state: State) => state.flow.addNodeCreate);
    return (
        <ButtonMenu
            onClick={addNodeCreate}
            icon={<Add/>}
            tooltip="New Create Node"
        />
    );
}
