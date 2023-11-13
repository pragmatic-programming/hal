import React, { useState } from "react";
import { IconButton, SvgIcon, TextField, Theme, Tooltip, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { firstCharUpperCase } from "../../../util";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import DeleteIcon from "@mui/icons-material/Delete";
import { SvgIconComponent } from "@mui/icons-material";
import { useReactFlow } from "reactflow";

interface Props {
    edgeDefinition: EdgeDefinition;
    label?: React.ReactNode;
    id: string;
}

export default function EdgeDefaultLabel(props: Props): React.JSX.Element {
    const setEdgeLabel = useStore((state: State) => state.reactFlow.setEdgeLabel);
    const {deleteElements} = useReactFlow();
    const [inputValue, setInputValue] = useState<SvgIconComponent>(props.edgeDefinition.icon);
    const theme: Theme = useTheme();
    let content: React.JSX.Element = (
        <Tooltip
            placement="top"
            title={"Delete " + firstCharUpperCase(props.edgeDefinition.type) + " Edge"}
        >
            <IconButton
                onClick={() => deleteElements({edges: [{id: props.id}]})}
                onMouseEnter={() => setInputValue(DeleteIcon)}
                onMouseLeave={() => setInputValue(props.edgeDefinition.icon)}
            >
                <SvgIcon component={inputValue}></SvgIcon>
            </IconButton>
        </Tooltip>
    );
    if (props.edgeDefinition.requiresLabel) {
        content = (
            <TextField
                variant="outlined"
                size="small"
                InputProps={{
                    inputProps: {
                        style: {
                            textAlign: "center",
                        }
                    }
                }}
                value={props.label}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEdgeLabel(props.id, event.target.value)}
                style={{
                    backgroundColor: theme.palette.primary.light,
                    width: 100,
                }}
            />
        );
    }
    return content;
}

