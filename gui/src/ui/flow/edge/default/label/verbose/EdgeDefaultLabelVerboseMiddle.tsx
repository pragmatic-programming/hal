import React from "react";
import { InputAdornment, InputProps, Stack, Theme, useTheme } from "@mui/material";
import { useStore } from "../../../../../../state/Store";
import { State } from "../../../../../../state/State";
import { EdgeDefaultLabelTextField } from "./EdgeDefaultLabelTextField";
import ButtonToggle from "../../../../../util/ButtonToggle";
import Description from "@mui/icons-material/Description";
import LabelOnIcon from "@mui/icons-material/Label";

interface Props {
    description: string,
    iconSize: number,
    id: string,
    label: string,
    rowWidth: number,
    setShowLabel: () => void,
    showIcon: boolean,
    showLabel: boolean,
}


export default function EdgeDefaultLabelVerboseMiddle(props: Props): React.JSX.Element {
    const theme: Theme = useTheme();
    const setEdgeLabel = useStore((state: State) => state.flow.setEdgeLabel);
    const setEdgeType = useStore((state: State) => state.flow.setEdgeEdgeDataDescription);


    let startAdornment: React.JSX.Element | undefined = undefined
    if (props.showIcon) {
        startAdornment = <InputAdornment position="start">
            <ButtonToggle
                iconOff={<Description/>}
                iconOn={<LabelOnIcon/>}
                on={props.showLabel}
                onClick={props.setShowLabel}
                placement={"top"}
                style={{width: props.iconSize, height: props.iconSize}}
                tooltipOff={"Description"}
                tooltipOn={"Label"}
            />
        </InputAdornment>;
    }


    const inputProps: Partial<InputProps> = {
        inputProps: {
            style: {
                textAlign: "center",
                paddingLeft: 4,
                paddingRight: 4,
            }
        },
        startAdornment: startAdornment,
    };

    if (props.showLabel) {
        return (
            <Stack
                style={{
                    width: props.rowWidth,
                }}
            >
                <EdgeDefaultLabelTextField
                    InputProps={inputProps}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEdgeLabel(props.id, event.target.value)}
                    size="small"
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        width: props.rowWidth,
                    }}
                    value={props.label}
                />
            </Stack>
        );
    }

    return (
        <Stack
            style={{
                width: props.rowWidth,
            }}
        >
            <EdgeDefaultLabelTextField
                InputProps={inputProps}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEdgeType(props.id, event.target.value)}
                size="small"
                style={{
                    backgroundColor: theme.palette.primary.main,
                    width: props.rowWidth,
                }}
                value={props.description}
            />
        </Stack>
    );

}
