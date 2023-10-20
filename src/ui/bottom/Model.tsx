import { Avatar, IconButton } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import React from "react";
import { useStore } from "../../Store";
import { State } from "../../State";
import { Environment, Processor } from "kico";
import { IHGraph } from "ihgraph";

interface Props {
    position: "start" | "inter" | "end";
    processor: Processor<any, any>;
}

export default function Model(props: Props): React.JSX.Element {
    const renderIHGraph = useStore((state: State) => state.renderIhGraph);
    let borderStyle: "dotted" | "solid" | "double";
    let borderWidth: number;
    let marginLeft: "-10px" | "0px" = "0px";
    let marginRight: "-10px" | "0px" = "0px";
    let property: IHGraph = props.processor.environment.getResult();
    switch (props.position) {
        case "start":
            borderStyle = "dotted";
            borderWidth = 2;
            marginLeft = "-10px";
            property = props.processor.environment.getProperty(Environment.SOURCE_MODEL);
            break;
        case "inter":
            borderStyle = "solid";
            borderWidth = 2;
            break;
        case "end":
            borderStyle = "double";
            borderWidth = 4;
            marginRight = "-10px";
            break;

    }
    return (
        <IconButton
            onClick={() => renderIHGraph(property)}
            sx={{
                marginLeft: marginLeft,
                marginRight: marginRight,
            }}
        >
            <Avatar
                style={{
                    backgroundColor: "#e0e0e0",
                    borderColor: "rgb(97, 97, 97)",
                    borderStyle: borderStyle,
                    borderWidth: borderWidth,
                    color: "rgb(97, 97, 97)",
                    cursor: "pointer",
                }}
            >
                <AccountTreeIcon color="action"/>
            </Avatar>
        </IconButton>
    );
}