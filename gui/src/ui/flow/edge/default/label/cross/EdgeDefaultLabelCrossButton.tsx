import { SvgIconComponent } from "@mui/icons-material";
import React from "react";
import { BoxBackgroundMain } from "../../../../../util/BoxBackgroundMain";
import { IconStatic } from "../../../../../util/IconStatic";
import { Placement } from "../../../../../util/Placement";

interface Props {
    disabled: boolean;
    icon: SvgIconComponent;
    onClick: () => void;
    placement: Placement;
    tooltip: string;
}

export default function EdgeDefaultLabelCrossButton(props: Props): React.JSX.Element {
    return (
        <BoxBackgroundMain>
            <IconStatic
                {...props}
            />
        </BoxBackgroundMain>
    );
}
