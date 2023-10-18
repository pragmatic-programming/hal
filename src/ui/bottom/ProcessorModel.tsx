import { Chip } from "@mui/material";
import React from "react";
import "./Bottom.scss";
import MemoryIcon from "@mui/icons-material/Memory";
import { Processor } from "../../../../kico-core";

interface Props {
    processor: Processor<any, any>;
}

export default function ProcessorModel(props: Props): React.JSX.Element {
    return (
        <Chip
            icon={<MemoryIcon/>}
            label={props.processor.getName()}
            style={{backgroundColor: "#e0e0e0"}}
        />
    );
}
