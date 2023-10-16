import React from "react";
import { useStore } from "../../Store";
import { State } from "../../State";
import { Box, Switch } from "@mui/material";

export default function SwitchLockedButton(): React.JSX.Element {
    const locked = useStore((state: State) => state.locked);
    const menuWidth: number = useStore((state: State) => state.menuWidth);
    const switchLocked = useStore((state: State) => state.switchLocked);
    return (
        <Box sx={{width: menuWidth, textAlign: "center", marginTop: 2}}>
            <Switch color="primary" checked={locked} onClick={switchLocked}/>
        </Box>
    );
}
