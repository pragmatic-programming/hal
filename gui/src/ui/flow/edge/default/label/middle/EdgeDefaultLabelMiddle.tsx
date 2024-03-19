import React, { useState } from "react";
import { EdgeDefinition } from "../../../../../../model/edge/EdgeDefinition";
import { EdgeData } from "../../../../../../model/edge/EdgeData";
import EdgeDefaultLabelVerboseMiddle from "../verbose/EdgeDefaultLabelVerboseMiddle";

// todo
interface Props {
    edgeData: EdgeData;
    edgeDefinition: EdgeDefinition;
    id: string;
    label: string;
    type: string;
}

export const edgeDefaultLabelVerboseIconSize: number = 40;

function calculateRowWidth(labelLength: number, showIcon: boolean): number {
    const minimumRowWidth: number = edgeDefaultLabelVerboseIconSize * 3;
    const characterPixelFactor: number = 12;
    const rowWidth: number = Math.max(
        minimumRowWidth,
        labelLength * characterPixelFactor
    );
    // if we want to show the icon we must add the iconSize to the rowWidth,
    // so that the overall label is still centered
    if (showIcon) {
        return rowWidth + edgeDefaultLabelVerboseIconSize;
    }
    return rowWidth;
}

export default function EdgeDefaultLabelMiddle(props: Props): React.JSX.Element {
    const [showIcon, setShowIcon] = useState<boolean>(false);
    const rowWidth: number = calculateRowWidth(props.label.length, showIcon);
    return (
        <div
            onMouseEnter={() => setShowIcon(true)}
            onMouseLeave={() => setShowIcon(false)}
        >
            <EdgeDefaultLabelVerboseMiddle
                description={props.edgeData.description}
                id={props.id}
                label={props.label}
                rowWidth={rowWidth}
                showIcon={showIcon}
            />
        </div>
    );
}

