import React from "react";
import { EdgeDefinition } from "../../../../../../model/edge/EdgeDefinition";
import { EdgeData } from "../../../../../../model/edge/EdgeData";
import EdgeDefaultLabelVerboseMiddle from "../verbose/EdgeDefaultLabelVerboseMiddle";
import { Hover } from "../../../../../util/Hover";

interface Props {
    edgeData: EdgeData;
    edgeDefinition: EdgeDefinition;
    id: string;
    label: string;
    type: string;
}


export default function EdgeDefaultLabelText(props: Props): React.JSX.Element {
    const on = <EdgeDefaultLabelVerboseMiddle
        description={props.edgeData.description}
        id={props.id}
        label={props.label}
        showIcon={true}
    />;
    const off = <EdgeDefaultLabelVerboseMiddle
        description={props.edgeData.description}
        id={props.id}
        label={props.label}
        showIcon={false}
    />;
    return (
        <Hover
            on={on}
            off={off}
        />
    );
}

