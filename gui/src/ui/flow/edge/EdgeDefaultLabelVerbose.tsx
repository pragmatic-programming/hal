import React, { CSSProperties, useState } from "react";
import { InputProps, Stack, Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { EdgeDefaultLabelTextField } from "./EdgeDefaultLabelTextField";
import { EdgeDefaultLabelIcon } from "./EdgeDefaultLabelIcon";
import { EdgeData } from "../../../model/edge/EdgeData";

interface Props {
    edgeDefinition: EdgeDefinition;
    edgeData: EdgeData;
    id: string;
    label: string;
}


const iconWidth: number = 40;
const minimumRowWidth: number = iconWidth * 3;
const characterPixelFactor = 12;
const labelAndPriorityInputProps: Partial<InputProps> = {
    inputProps: {
        style: {
            textAlign: "center",
            paddingLeft: 4,
            paddingRight: 4,
        }
    },
};

export default function EdgeDefaultLabelVerbose(props: Props): React.JSX.Element {
    const setEdgeLabel = useStore((state: State) => state.flow.setEdgeLabel);
    const setEdgePriority = useStore((state: State) => state.flow.setEdgePriority);
    const [tempPriority, setTempPriority] = useState(props.edgeData.priority.toString());
    const theme: Theme = useTheme();

    const rowWidth: number = Math.max(minimumRowWidth, props.label.length * characterPixelFactor);
    const rowStyle: CSSProperties = {width: rowWidth};

    function onBlur(): void {
        const parsedPriority: number = parseInt(tempPriority);
        if (isNaN(parsedPriority)) {
            return;
        }
        setEdgePriority(props.id, parsedPriority);
    }

    return (
        <>
            <Stack
                direction="row"
                justifyContent="center"
                style={rowStyle}
            >
                <EdgeDefaultLabelIcon
                    icon={props.edgeDefinition.icon}
                    id={props.id}
                    style={{width: iconWidth}}
                />
            </Stack>
            <Stack
                style={rowStyle}
            >
                <EdgeDefaultLabelTextField
                    InputProps={labelAndPriorityInputProps}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEdgeLabel(props.id, event.target.value)}
                    size="small"
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        width: rowWidth,
                    }}
                    value={props.label}
                />
            </Stack>
            <Stack
                direction="row"
                style={rowStyle}
                justifyContent="center"
            >
                <EdgeDefaultLabelTextField
                    InputProps={labelAndPriorityInputProps}
                    onBlur={onBlur}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setTempPriority(event.target.value)}
                    size="small"
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        width: iconWidth,
                    }}
                    value={tempPriority}
                />
            </Stack>
        </>
    );
}

