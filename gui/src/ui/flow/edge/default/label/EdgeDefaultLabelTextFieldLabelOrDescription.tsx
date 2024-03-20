import React from "react";
import { useStore } from "../../../../../state/Store";
import { State } from "../../../../../state/State";
import { EdgeDefaultLabelTextField } from "./EdgeDefaultLabelTextField";

interface Props {
    description: string,
    id: string,
    label: string,
    showLabel: boolean,
    startAdornment: React.JSX.Element | undefined,
}


export default function EdgeDefaultLabelTextFieldLabelOrDescription(props: Props): React.JSX.Element {
    const setLabel = useStore((state: State) => state.flow.setEdgeLabel);
    const setDescription = useStore((state: State) => state.flow.setEdgeEdgeDataDescription);

    if (props.showLabel) {
        return (
            <EdgeDefaultLabelTextField
                onChange={(value: string) => setLabel(props.id, value)}
                placeholder={"Label"}
                startAdornment={props.startAdornment}
                value={props.label}
            />
        );
    }

    return (
        <EdgeDefaultLabelTextField
            onChange={(value: string) => setDescription(props.id, value)}
            placeholder={"Description"}
            startAdornment={props.startAdornment}
            value={props.description}
        />
    );

}
