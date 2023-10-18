import { Avatar } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import React from "react";

interface Props {
    border: "solid" | "dotted" | "double";
}

export default function Model(props: Props): React.JSX.Element {
    return (
        <Avatar
            color={"primary"}
            style={{
                backgroundColor: "#e0e0e0",
                color: "rgb(97, 97, 97)",
                borderWidth: props.border === "double" ? 4 : 2,
                borderStyle: props.border,
                borderColor: "rgb(97, 97, 97)"
            }}
        >
            <AccountTreeIcon color="action"/>
        </Avatar>
    );
}
