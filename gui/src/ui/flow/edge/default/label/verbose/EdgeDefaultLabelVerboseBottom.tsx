import React, { useState } from "react";
import { Stack } from "@mui/material";
import { useStore } from "../../../../../../state/Store";
import { State } from "../../../../../../state/State";
import { EdgeDefaultLabelTextField } from "../EdgeDefaultLabelTextField";
import { EdgeData } from "../../../../../../model/edge/EdgeData";
import { edgeDefaultLabelVerboseIconSize } from "./EdgeDefaultLabelVerbose";

interface Props {
    edgeData: EdgeData;
    id: string;
}

export default function EdgeDefaultLabelVerboseBottom(props: Props): React.JSX.Element {
    const setEdgePriority = useStore((state: State) => state.flow.setEdgeEdgeDataPriority);
    const [tempPriority, setTempPriority] = useState(props.edgeData.priority.toString());

    function onBlur(): void {
        const parsedPriority: number = parseInt(tempPriority);
        if (isNaN(parsedPriority)) {
            return;
        }
        setEdgePriority(props.id, parsedPriority);
    }

    return (
        <Stack
            direction="row"
            justifyContent="center"
        >
            <EdgeDefaultLabelTextField
                maxWidth={edgeDefaultLabelVerboseIconSize}
                onBlur={onBlur}
                onChange={(value: string) => setTempPriority(value)}
                placeholder={"1"}
                value={tempPriority}
            />
        </Stack>
    );
}

