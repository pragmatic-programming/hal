import React from "react";
import RedoIcon from "@mui/icons-material/Redo";
import CallMadeIcon from "@mui/icons-material/CallMade";
import MovingIcon from "@mui/icons-material/Moving";
import ButtonMenu from "./ButtonMenu";
import { State } from "../../state/State";
import { useStore } from "../../state/Store";

export default function MenuEdgePathStyle(): React.JSX.Element {
    const setEdgePathStyle = useStore((state: State) => state.reactFlow.setEdgePathStyle);
    return (
        <>
            <ButtonMenu
                icon={<RedoIcon/>}
                onClick={() => setEdgePathStyle("Bezier")}
                tooltip="Bezier"
            />
            <ButtonMenu
                icon={<CallMadeIcon/>}
                onClick={() => setEdgePathStyle("Straight")}
                tooltip="Straight"
            />
            <ButtonMenu
                icon={<MovingIcon/>}
                onClick={() => setEdgePathStyle("Smooth")}
                tooltip="Smooth"
            />
        </>
    );
}
