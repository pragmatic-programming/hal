import React from "react";
import "./App.scss";
import Menu from "./ui/menu/Menu";
import Theme from "./ui/Theme";
import Bottom from "./ui/bottom/Bottom";
import { ReactFlowProvider } from "reactflow";
import Flow from "./ui/flow/Flow";

export default function App(): React.JSX.Element {
    return (
        <Theme>
            <ReactFlowProvider>
                <Flow/>
                <Menu/>
                <Bottom/>
            </ReactFlowProvider>
        </Theme>
    );
}

