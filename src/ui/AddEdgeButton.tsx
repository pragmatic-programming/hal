
import React from "react";
import { useStore } from "../Store";
import { State } from "../State";
import MenuButton from "./MenuButton";
import { TrendingFlat } from "@mui/icons-material";

export default function AddEdgeButton(): React.JSX.Element {
    const notBothEditorsAreSelected: boolean = useStore((state: State) => state.highlightedEditor.first === null || state.highlightedEditor.second === null);
    const addEdge = useStore((state: State) => state.addEdge);
    return (
        <MenuButton
            onClick={addEdge}
            disabled={notBothEditorsAreSelected}
            icon={<TrendingFlat fontSize="inherit"/>}
        />
    );
}
