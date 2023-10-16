import React from "react";
import { useStore } from "../../Store";
import { State } from "../../State";
import { Box, Switch } from "@mui/material";
import { gui } from "../../constants";

export default function SwitchLockedButton(): React.JSX.Element {
    const locked = useStore((state: State) => state.locked);
    const switchLocked = useStore((state: State) => state.switchLocked);
    return (
        <Box sx={{width: gui.menuWidth, textAlign: "center", marginTop: 2}}>
            <Switch color="primary" checked={locked} onClick={switchLocked}/>
        </Box>
    );
}
