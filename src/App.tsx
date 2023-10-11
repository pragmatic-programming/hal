import React from "react";
import "./App.scss";
import Menu from "./ui/Menu";
import Main from "./ui/Main";
import Bottom from "./ui/Bottom";
import Theme from "./ui/Theme";


export default function App() {
    return (
        <Theme>
            <Main/>
            <Bottom/>
            <Menu/>
        </Theme>
    );
}

