import React, { useState } from "react";
import { EdgeDefinition } from "../../../../../../model/edge/EdgeDefinition";
import { EdgeData } from "../../../../../../model/edge/EdgeData";
import EdgeDefaultLabelTextFieldLabelOrDescriptionWithIcon from "../EdgeDefaultLabelTextFieldLabelOrDescriptionWithIcon";
import EdgeDefaultLabelVerboseTop from "./EdgeDefaultLabelVerboseTop";
import EdgeDefaultLabelVerboseBottom from "./EdgeDefaultLabelVerboseBottom";

interface Props {
    edgeData: EdgeData;
    edgeDefinition: EdgeDefinition;
    id: string;
    label: string;
    type: string;
}

export const edgeDefaultLabelVerboseIconSize: number = 40;

export default function EdgeDefaultLabelVerbose(props: Props): React.JSX.Element {
    const [hover, setHover] = useState<boolean>(false);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <EdgeDefaultLabelVerboseTop
                edgeDefinition={props.edgeDefinition}
                id={props.id}
            />
            <EdgeDefaultLabelTextFieldLabelOrDescriptionWithIcon
                description={props.edgeData.description}
                id={props.id}
                label={props.label}
                showIcon={hover}
            />
            <EdgeDefaultLabelVerboseBottom
                edgeData={props.edgeData}
                id={props.id}
            />
        </div>
    );
}

