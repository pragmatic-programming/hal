import React from "react";
import { State } from "../../state/State";
import { useStore } from "../../state/Store";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ButtonMenu from "./ButtonMenu";
import { FormatListBulleted } from "@mui/icons-material";
import { createIHGraphFromJSON } from "ihgraph";
import { useReactFlow } from "reactflow";

import example1 from "../../model/examples/example1.json";
import example2 from "../../model/examples/example2.json";

const examples = [
    {
        id: 1,
        name: "Example 1",
        value: example1,
    },
    {
        id: 2,
        name: "Example 2",
        value: example2,
    },
];

export default function MenuExamples(): React.JSX.Element {
    const open: boolean = useStore((state: State) => state.menuExamples.open);
    const menuOpenToggle = useStore((state: State) => state.menuExamples.menuOpenToggle);
    const {getNode, fitView} = useReactFlow();
    const render = useStore((state: State) => (ihGraphAsJson: any) => {
        state.compilation.render(
            createIHGraphFromJSON(ihGraphAsJson),
            getNode,
            fitView
        );
    });
    return (
        <>
            <ButtonMenu
                icon={<FormatListBulleted/>}
                onClick={menuOpenToggle}
                tooltip={"Examples"}
            />
            <Drawer
                anchor={"left"}
                open={open}
                onClose={() => menuOpenToggle()}
            >
                <List
                    style={{
                        width: 200
                    }}
                >
                    {examples.map(example =>
                        <ListItem key={example.id}>
                            <ListItemButton
                                onClick={() => render(example.value)}
                            >
                                <ListItemIcon>
                                    <AccountTreeIcon/>
                                </ListItemIcon>
                                <ListItemText primary={example.name}/>
                            </ListItemButton>
                        </ListItem>
                    )}
                </List>
            </Drawer>
        </>
    );
}
