import { IconButton, Typography } from "@mui/material";
import React from "react";
import { Close } from "@mui/icons-material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { editorHeaderHeight } from "../../editor/EditorHeader";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";


export default function DialogNodeNewHeader(): React.JSX.Element {
    const openNewDialog = useStore((state: State) => state.openNewNodeDialog);
    return (
        <BoxBackgroundMain
            border="bottom"
            style={{
                alignItems: "center",
                display: "flex",
                paddingLeft: 5,
                paddingRight: 20,
                height: editorHeaderHeight // todo make global constant
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
                color="inherit"
                aria-label="close"
                onClick={() => openNewDialog(undefined)}
            >
                <Close/>
            </IconButton>
        </BoxBackgroundMain>
    );
}
