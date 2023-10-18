import { Avatar } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import React from "react";
import { useStore } from "../../Store";
import { State } from "../../State";
import { Processor } from "kico";

interface Props {
    border: "solid" | "dotted" | "double";
    processor: Processor<any, any>;
}

export default function Model(props: Props): React.JSX.Element {
    const setProject = useStore((state: State) => state.setProject);
    return (
        <Avatar
            color={"primary"}
            onClick={() => setProject(props.processor)}
            style={{
                backgroundColor: "#e0e0e0",
                borderColor: "rgb(97, 97, 97)",
                borderStyle: props.border,
                borderWidth: props.border === "double" ? 4 : 2,
                color: "rgb(97, 97, 97)",
                cursor: "pointer",
            }}
        >
            <AccountTreeIcon color="action"/>
        </Avatar>
    );
}
