import React from "react";
import { EdgeDefinition } from "../../../../../../model/edge/EdgeDefinition";
import { EdgeDefaultLabelIcon } from "../EdgeDefaultLabelIcon";
import { Stack } from "@mui/material";
import { edgeDefaultLabelVerboseIconSize } from "./EdgeDefaultLabelVerbose";

interface Props {
    edgeDefinition: EdgeDefinition;
    id: string;
}

export default function EdgeDefaultLabelVerboseTop(props: Props): React.JSX.Element {
    return (
        <Stack
            direction="row"
            justifyContent="center"
        >
            <EdgeDefaultLabelIcon
                icon={props.edgeDefinition.icon}
                id={props.id}
                tooltip={"Delete Edge"}
                width={edgeDefaultLabelVerboseIconSize}
            />
        </Stack>
    );
}

