import { Dialog } from "@mui/material";
import React from "react";
import { NewDialogOpenState } from "../../../state/substates/NewDialogOpenState";
import { DialogNodeNewBody } from "./DialogNodeNewBody";
import DialogNodeNewHeader from "./DialogNodeNewHeader";

interface Props {
    newNodeDialogOpen: NewDialogOpenState;
}


export default function DialogNodeNew(props: Props): React.JSX.Element {
    return (
        <Dialog
            fullScreen
            open={true}
        >
            <DialogNodeNewHeader/>
            <DialogNodeNewBody nodeId={props.newNodeDialogOpen.nodeId}/>
        </Dialog>
    );
}
