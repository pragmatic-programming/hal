import React from "react";
import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { firstCharUpperCase } from "../../../util";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

interface Props {
    on: boolean;
    onClick: () => void;
    optionName: string;
}

export default function MenuCompilationsOptionButton(props: Props): React.JSX.Element {
    return (
        <ListItem>
            <ListItemButton
                onClick={props.onClick}
            >
                <ListItemIcon>
                    {props.on ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
                </ListItemIcon>
                {firstCharUpperCase(props.optionName)}
            </ListItemButton>
        </ListItem>
    );
}
