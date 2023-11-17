import React, { useState } from "react";
import { IconButton, InputAdornment, SvgIcon, Theme, Tooltip, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { firstCharUpperCase } from "../../../util";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import DeleteIcon from "@mui/icons-material/Delete";
import { SvgIconComponent } from "@mui/icons-material";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { EdgeDefaultLabelTextField } from "./EdgeDefaultLabelTextField";

interface Props {
    edgeDefinition: EdgeDefinition;
    label: string;
    id: string;
}

export default function EdgeDefaultLabel(props: Props): React.JSX.Element {
    const setEdgeLabel = useStore((state: State) => state.reactFlow.setEdgeLabel);
    const reactFlow: ReactFlowInstance = useReactFlow();
    const [inputValue, setInputValue] = useState<SvgIconComponent>(props.edgeDefinition.icon);
    const theme: Theme = useTheme();
    const iconButton: React.JSX.Element = (
        <IconButton
            onClick={() => reactFlow.deleteElements({edges: [{id: props.id}]})}
            onMouseEnter={() => setInputValue(DeleteIcon)}
            onMouseLeave={() => setInputValue(props.edgeDefinition.icon)}
        >
            <SvgIcon component={inputValue}></SvgIcon>
        </IconButton>
    );
    let content: React.JSX.Element = (
        <Tooltip
            placement="top"
            title={"Delete " + firstCharUpperCase(props.edgeDefinition.type) + " Edge"}
        >
            {iconButton}
        </Tooltip>
    );
    if (props.edgeDefinition.requiresLabel) {
        content = (
            <EdgeDefaultLabelTextField
                size="small"
                InputProps={{
                    inputProps: {
                        style: {
                            textAlign: "center",
                        }
                    },
                    startAdornment: (
                        <InputAdornment position="start">
                            {iconButton}
                        </InputAdornment>
                    ),
                }}
                value={props.label}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEdgeLabel(props.id, event.target.value)}
                style={{
                    backgroundColor: theme.palette.primary.main,
                    width: Math.max(130, props.label.length * 12),
                }}
            />
        );
    }
    return content;
}

