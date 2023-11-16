import React, { CSSProperties } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { IconButton } from "@mui/material";
import { BoxBorder } from "../../util/BoxBorder";

interface Props {
    borderColor: string,
    height: number,
    width: number,
}

const padding: CSSProperties = {padding: 9};

export default function NodeImageDefault(props: Props): React.JSX.Element {
    return (
        <BoxBorder
            borderColor={props.borderColor}
        >
            <BoxBackgroundMain style={padding}>
                <IconButton style={padding}>
                    <ImageIcon style={{width: props.width, height: props.height}}/>
                </IconButton>
            </BoxBackgroundMain>
        </BoxBorder>
    );
}
