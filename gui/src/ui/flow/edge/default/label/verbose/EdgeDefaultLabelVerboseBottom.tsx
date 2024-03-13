import React, { useState } from "react";
import { InputProps, Stack, Theme, useTheme } from "@mui/material";
import { useStore } from "../../../../../../state/Store";
import { State } from "../../../../../../state/State";
import { EdgeDefaultLabelTextField } from "./EdgeDefaultLabelTextField";
import { EdgeData } from "../../../../../../model/edge/EdgeData";

interface Props {
    edgeData: EdgeData;
    iconSize: number;
    id: string;
    rowWidth: number;
}

// todo
const labelAndPriorityInputProps: Partial<InputProps> = {
    inputProps: {
        style: {
            textAlign: "center",
            paddingLeft: 4,
            paddingRight: 4,
        }
    },
};

export default function EdgeDefaultLabelVerboseBottom(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
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
                InputProps={labelAndPriorityInputProps}
                onBlur={onBlur}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTempPriority(event.target.value)}
                size="small"
                style={{
                    backgroundColor: theme.palette.primary.main,
                    width: props.iconSize,
                }}
                value={tempPriority}
            />
        </Stack>
    );
}

