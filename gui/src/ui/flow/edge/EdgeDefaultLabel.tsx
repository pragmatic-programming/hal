import React from "react";
import { InputAdornment, Theme, useTheme } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { firstCharUpperCase } from "../../../util";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import DeleteIcon from "@mui/icons-material/Delete";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { EdgeDefaultLabelTextField } from "./EdgeDefaultLabelTextField";
import { IconDynamic } from "../../util/IconDynamic";

interface Props {
    edgeDefinition: EdgeDefinition;
    id: string;
    label: string;
}

export default function EdgeDefaultLabel(props: Props): React.JSX.Element {
    const setEdgeLabel = useStore((state: State) => state.flow.setEdgeLabel);
    const reactFlow: ReactFlowInstance = useReactFlow();
    const theme: Theme = useTheme();
    let content: React.JSX.Element = (
        <IconDynamic
            iconDefault={props.edgeDefinition.icon}
            iconHover={DeleteIcon}
            onClick={() => reactFlow.deleteElements({edges: [{id: props.id}]})}
            tooltip={"Delete " + firstCharUpperCase(props.edgeDefinition.type) + " Edge"}
        />
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
                            {content}
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

