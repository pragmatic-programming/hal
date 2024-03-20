import React, { useState } from "react";
import { EdgeDefinition } from "../../../../../../model/edge/EdgeDefinition";
import { EdgeData } from "../../../../../../model/edge/EdgeData";
import EdgeDefaultLabelVerboseMiddle from "../verbose/EdgeDefaultLabelVerboseMiddle";

interface Props {
    edgeData: EdgeData;
    edgeDefinition: EdgeDefinition;
    id: string;
    label: string;
    type: string;
}


export default function EdgeDefaultLabelText(props: Props): React.JSX.Element {
    const [hover, setHover] = useState<boolean>(false);
    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <EdgeDefaultLabelVerboseMiddle
                description={props.edgeData.description}
                id={props.id}
                label={props.label}
                showIcon={hover}
            />
        </div>
    );
}

