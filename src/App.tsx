import React from "react";
import "./App.scss";
import Menu from "./ui/Menu";
import Main from "./ui/Main";
import Theme from "./ui/Theme";
import Bottom from "./ui/Bottom";

export default function App(): React.JSX.Element {
    return (
        <Theme>
            <Main/>
            <Menu/>
            <Bottom/>
        </Theme>
    );
}

