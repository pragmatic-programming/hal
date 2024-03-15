import React, { useState } from "react";
import { Stack } from "@mui/material";
import { useStore } from "../../../../../../state/Store";
import { State } from "../../../../../../state/State";
import { EdgeDefaultLabelTextField } from "./EdgeDefaultLabelTextField";
import { EdgeData } from "../../../../../../model/edge/EdgeData";
import { edgeDefaultLabelVerboseIconSize } from "./EdgeDefaultLabelVerbose";

interface Props {
    edgeData: EdgeData;
    id: string;
    rowWidth: number;
}

export default function EdgeDefaultLabelVerboseBottom(props: Props): React.JSX.Element {
    const setEdgePriority = useStore((state: State) => state.flow.setEdgePriority);
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
            style={{
                width: props.rowWidth
            }}
            justifyContent="center"
        >
            <EdgeDefaultLabelTextField
                onBlur={onBlur}
                onChange={(value: string) => setTempPriority(value)}
                placeholder={"1"}
                value={tempPriority}
                width={edgeDefaultLabelVerboseIconSize}
            />
        </Stack>
    );
}

