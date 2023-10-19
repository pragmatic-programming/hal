import React from "react";
import "./App.scss";
import Menu from "./ui/menu/Menu";
import Main from "./ui/main/Main";
import Theme from "./ui/Theme";
import Bottom from "./ui/bottom/Bottom";
import { ReactFlowProvider } from "reactflow";

export default function App(): React.JSX.Element {
    return (
        <Theme>
            <ReactFlowProvider>
                <Main/>
                <Menu/>
                <Bottom/>
            </ReactFlowProvider>
        </Theme>
    );
}

