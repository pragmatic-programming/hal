import { SvgIconComponent } from "@mui/icons-material";
import React from "react";
import { BoxBackgroundMain } from "../../../../../util/BoxBackgroundMain";
import { ButtonIconStatic } from "../../../../../util/ButtonIconStatic";
import { Placement } from "../../../../../util/Placement";

interface Props {
    disabled: boolean;
    icon: SvgIconComponent;
    onClick: () => void;
    placement: Placement;
    tooltip: string;
}

export default function EdgeDefaultLabelCompactButton(props: Props): React.JSX.Element {
    return (
        <BoxBackgroundMain>
            <ButtonIconStatic
                size={"medium"}
                {...props}
            />
        </BoxBackgroundMain>
    );
}
