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
import MenuButton from "../MenuButton";
import { FormatListBulleted } from "@mui/icons-material";
import { createIHGraphFromJSON } from "@pragmatic-programming/ihgraph";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { examples } from "../../../examples/examples";
import { Example } from "../../../examples/Example";

const menuExamplesWidth: number = 300;

export default function MenuExamples(): React.JSX.Element {
    const menuOpenToggle = useStore((state: State) => state.ui.examples.examplesOpenToggle);
    const open: boolean = useStore((state: State) => state.ui.examples.open);
    const reactFlow: ReactFlowInstance = useReactFlow();
    const render = useStore((state: State) => (example: Example) => {
        state.flow.render(
            createIHGraphFromJSON(example.value),
            reactFlow.fitView,
            example.name,
        );
    });
    return (
        <>
            <MenuButton
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
