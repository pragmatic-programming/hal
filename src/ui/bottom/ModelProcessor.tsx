import { Chip, Theme, useTheme } from "@mui/material";
import React from "react";
import "./Bottom.scss";
import MemoryIcon from "@mui/icons-material/Memory";
import { Processor } from "kico";

interface Props {
    processor: Processor<any, any>;
}

export default function ModelProcessor(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    let background: string = theme.palette.primary.dark;

    // TODO: color contrasts
    if (props.processor.getStatus().hasWarnings()) {
        background = theme.palette.warning.main;
    }    
    if (props.processor.getStatus().hasErrors()) {
        background = theme.palette.error.main;
    }

    return (
        <Chip
            icon={<MemoryIcon/>}
            label={props.processor.getName()}
            style={{
                backgroundColor: background
            }}
        />
    );
}
