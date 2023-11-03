import { Dialog } from "@mui/material";
import React from "react";
import { StateDialogNodeNewOpen } from "../../../state/dialogNodeNew/StateDialogNodeNew";
import { DialogNodeNewBody } from "./DialogNodeNewBody";
import DialogNodeNewHeader from "./DialogNodeNewHeader";

interface Props {
    stateDialogNodeNewOpen: StateDialogNodeNewOpen;
}


export default function DialogNodeNew(props: Props): React.JSX.Element {
    return (
        <Dialog
            fullScreen={true}
            open={true}
        >
            <DialogNodeNewHeader/>
            <DialogNodeNewBody
                nodeId={props.stateDialogNodeNewOpen.nodeId}
            />
        </Dialog>
    );
}
