import { Chip, Theme, Tooltip, useTheme } from "@mui/material";
import React, { CSSProperties } from "react";
import "./Bottom.scss";
import MemoryIcon from "@mui/icons-material/Memory";
import { Processor, StatusEntry } from "@pragmatic-programming/kico";

interface Props {
    processor: Processor<any, any>;
}

export default function ModelProcessor(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    let title: string = "Successful";
    let styleIcon: CSSProperties = {};
    let styleChip: CSSProperties = {
        backgroundColor: theme.palette.primary.dark
    };
    const errors: StatusEntry[] = props.processor.getStatus().getErrors();
    if (errors.length > 0) {
        title = errors[0].message;
        styleIcon.color = theme.palette.primary.main;
        styleChip.backgroundColor = theme.palette.error.main;
        styleChip.color = theme.palette.primary.main;
    }
    return (
        <Tooltip
            placement="top"
            title={title}
        >
            <Chip
                icon={<MemoryIcon style={styleIcon}/>}
                label={props.processor.getName()}
                style={styleChip}
            />
        </Tooltip>
    );
}
