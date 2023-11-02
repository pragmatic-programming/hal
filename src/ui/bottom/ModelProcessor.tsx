import { Chip, Theme, useTheme } from "@mui/material";
import React from "react";
import "./Bottom.scss";
import MemoryIcon from "@mui/icons-material/Memory";
import { Processor } from "../../../../kico-core";

interface Props {
    processor: Processor<any, any>;
}

export default function ModelProcessor(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    return (
        <Chip
            icon={<MemoryIcon/>}
            label={props.processor.getName()}
            style={{backgroundColor: theme.palette.primary.dark}}
        />
    );
}
