import React, { useState } from "react";
import { EdgeDefinition } from "../../../../../../model/edge/EdgeDefinition";
import { EdgeData } from "../../../../../../model/edge/EdgeData";
import EdgeDefaultLabelVerboseMiddle from "./EdgeDefaultLabelVerboseMiddle";
import EdgeDefaultLabelVerboseTop from "./EdgeDefaultLabelVerboseTop";
import EdgeDefaultLabelVerboseBottom from "./EdgeDefaultLabelVerboseBottom";

interface Props {
    edgeData: EdgeData;
    edgeDefinition: EdgeDefinition;
    id: string;
    label: string;
    type: string;
}

const iconSize: number = 40;
const minimumRowWidth: number = iconSize * 3;
const characterPixelFactor = 12;

export default function EdgeDefaultLabelVerbose(props: Props): React.JSX.Element {
    const [showIcon, setShowIcon] = useState<boolean>(false);

    // todo
    let rowWidth: number = Math.max(minimumRowWidth, props.label.length * characterPixelFactor);
    rowWidth = rowWidth + (showIcon ? iconSize : 0);

    return (
        <div
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
        >
            <EdgeDefaultLabelVerboseTop
                edgeDefinition={props.edgeDefinition}
                iconSize={iconSize}
                id={props.id}
                rowWidth={rowWidth}
            />
            <EdgeDefaultLabelVerboseMiddle
                id={props.id}
                label={props.label}
                iconSize={iconSize}
                rowWidth={rowWidth}
                showIcon={showIcon}
                description={props.edgeData.description}
            />
            <EdgeDefaultLabelVerboseBottom
                edgeData={props.edgeData}
                iconSize={iconSize}
                id={props.id}
                rowWidth={rowWidth}
            />
        </div>
    );
}

