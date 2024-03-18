import React, { CSSProperties } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { ButtonIconDynamic } from "./ButtonIconDynamic";
import { ButtonIconStatic } from "./ButtonIconStatic";

interface Props {
    iconDefault: SvgIconComponent;
    iconHover?: SvgIconComponent;
    onClick: () => void;
    size: "small" | "medium" | "large";
    tooltip: string;
}

const style: CSSProperties = {
    marginLeft: 5,
    marginRight: 5,
};

export function ButtonIcon(props: Props): React.JSX.Element {
    if (props.iconHover) {
        return <ButtonIconDynamic style={style} {...props} iconHover={props.iconHover}/>;
    }
    return <ButtonIconStatic style={style} {...props} icon={props.iconDefault}/>;
}
