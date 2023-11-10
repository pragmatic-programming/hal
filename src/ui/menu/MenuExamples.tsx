import React from "react";
import { State } from "../../state/State";
import { useStore } from "../../state/Store";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ButtonMenu from "./ButtonMenu";
import { FormatListBulleted } from "@mui/icons-material";
import { createIHGraphFromJSON } from "ihgraph";
import { useReactFlow } from "reactflow";
import { Example, examples } from "../../model/examples/examples";

const menuExamplesWidth = 300;

export default function MenuExamples(): React.JSX.Element {
    const open: boolean = useStore((state: State) => state.menuExamples.open);
    const menuOpenToggle = useStore((state: State) => state.menuExamples.menuOpenToggle);
    const {fitView} = useReactFlow();
    const render = useStore((state: State) => (example: Example) => {
        state.reactFlow.render(
            createIHGraphFromJSON(example.value),
            fitView,
            example.name,
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
                onClose={menuOpenToggle}
            >
                <List
                    style={{
                        width: menuExamplesWidth
                    }}
                >
                    {examples.map(example =>
                        <ListItem key={example.id}>
                            <ListItemButton
                                onClick={() => render(example)}
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
