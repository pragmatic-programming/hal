import React from "react";
import { PlayArrow } from "@mui/icons-material";
import MenuButton from "./MenuButton";

export default function PlayButton(): React.JSX.Element {
    return (
        <MenuButton
            onClick={() => {
                // todo
            }}
            icon={<PlayArrow fontSize="inherit" color={"success"}/>}
        />
    );
}
