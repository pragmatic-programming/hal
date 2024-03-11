import { ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon } from "@mui/material";
import { State } from "../../../state/State";
import { useStore } from "../../../state/Store";
import { Director } from "../../../processors/directors/Director";
import { HALGraphProcessor } from "../../../processors/directors/HALGraphProcessor";
import { SvgIconComponent } from "@mui/icons-material";
import React from "react";

interface Props extends Director {
    id: number,
    name: string,
    processor: typeof HALGraphProcessor,
    icon: SvgIconComponent;
}

export function MenuCompilationsButtonDirector(props: Props): React.JSX.Element {
    const setDirector = useStore((state: State) => state.compilation.setDirector);
    return (
        <ListItem key={props.id}>
        <ListItemButton
            onClick={() => setDirector(props.processor)}
        >
            <ListItemIcon>
                <SvgIcon component={props.icon}></SvgIcon>
            </ListItemIcon>
            <ListItemText primary={props.name}/>
        </ListItemButton>
    </ListItem>
    );
}
