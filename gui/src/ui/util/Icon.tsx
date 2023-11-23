import React, { CSSProperties } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { IconDynamic } from "./IconDynamic";
import { IconStatic } from "./IconStatic";

interface Props {
    iconDefault: SvgIconComponent;
    iconHover?: SvgIconComponent;
    onClick: () => void;
}

const style: CSSProperties = {
    marginLeft: 5,
    marginRight: 5,
};

export function Icon(props: Props): React.JSX.Element {
    if (props.iconHover) {
        return <IconDynamic style={style} {...props} iconHover={props.iconHover}/>;
    }
    return <IconStatic style={style} icon={props.iconDefault} onClick={props.onClick}/>;
}
