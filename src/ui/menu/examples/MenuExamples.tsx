import React from "react";
import { State } from "../../../state/State";
import { useStore } from "../../../state/Store";
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    SvgIcon
} from "@mui/material";
import ButtonMenu from "../ButtonMenu";
import { FormatListBulleted } from "@mui/icons-material";
import { createIHGraphFromJSON } from "ihgraph";
import { useReactFlow } from "reactflow";
import { examples } from "../../../model/examples/examples";
import { Example } from "../../../model/examples/Example";

const menuExamplesWidth = 300;

export default function MenuExamples(): React.JSX.Element {
    const open: boolean = useStore((state: State) => state.menuExamples.open);
    const menuOpenToggle = useStore((state: State) => state.menuExamples.menuExampleOpenToggle);
    const reactFlow = useReactFlow();
    const render = useStore((state: State) => (example: Example) => {
        state.reactFlow.render(
            createIHGraphFromJSON(example.value),
            reactFlow.fitView,
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
                    subheader={
                        <ListSubheader>Examples</ListSubheader>
                    }
                >
                    <Divider/>
                    {examples
                        .sort((e1: Example, e2: Example) => e1.name.localeCompare(e2.name))
                        .map((example: Example) =>
                            <ListItem key={example.id}>
                                <ListItemButton
                                    onClick={() => render(example)}
                                >
                                    <ListItemIcon>
                                        <SvgIcon component={example.icon}></SvgIcon>
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
