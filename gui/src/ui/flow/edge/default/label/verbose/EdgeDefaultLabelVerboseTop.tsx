import React from "react";
import { EdgeDefinition } from "../../../../../../model/edge/EdgeDefinition";
import { EdgeDefaultLabelIcon } from "../EdgeDefaultLabelIcon";
import { Stack } from "@mui/material";
import { edgeDefaultLabelVerboseIconSize } from "./EdgeDefaultLabelVerbose";

interface Props {
    edgeDefinition: EdgeDefinition;
    id: string;
    rowWidth: number;
}

export default function EdgeDefaultLabelVerboseTop(props: Props): React.JSX.Element {
    return (
        <Stack
            direction="row"
            justifyContent="center"
            style={{
                width: props.rowWidth
            }}
        >
            <EdgeDefaultLabelIcon
                icon={props.edgeDefinition.icon}
                id={props.id}
                style={{width: edgeDefaultLabelVerboseIconSize}}
                tooltip={"Delete Edge"}
            />
        </Stack>
    );
}

