import { IconButton, Typography } from "@mui/material";
import React from "react";
import { Close } from "@mui/icons-material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { editorHeaderHeight } from "../../editor/EditorHeader";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";


export default function DialogNodeNewHeader(): React.JSX.Element {
    const dialogOpen = useStore((state: State) => state.dialog.dialogOpen);
    return (
        <BoxBackgroundMain
            border="bottom"
            style={{
                alignItems: "center",
                display: "flex",
                height: editorHeaderHeight,
                paddingLeft: 5,
                paddingRight: 20,
            }}
        >
            <Typography
                style={{
                    flex: 1,
                    marginLeft: 8,
                }}
                variant="body1"
                component="div"
            >
                New Node
            </Typography>
            <IconButton
                edge="end"
                aria-label="close"
                onClick={() => dialogOpen(undefined)}
            >
                <Close/>
            </IconButton>
        </BoxBackgroundMain>
    );
}
