import React, { CSSProperties } from "react";
import { SvgIconComponent } from "@mui/icons-material";
import { EditorHeaderIconDynamic } from "./EditorHeaderIconDynamic";
import { EditorHeaderIconStatic } from "./EditorHeaderIconStatic";

interface Props {
    iconDefault: SvgIconComponent;
    iconHover?: SvgIconComponent;
    onClick: () => void;
}

const style: CSSProperties = {
    marginRight: 5,
    marginLeft: 5,
};

export function EditorHeaderIcon(props: Props): React.JSX.Element {
    if (props.iconHover) {
        return <EditorHeaderIconDynamic style={style} {...props} iconHover={props.iconHover}/>;
    }
    return <EditorHeaderIconStatic style={style} icon={props.iconDefault} onClick={props.onClick}/>;
}
