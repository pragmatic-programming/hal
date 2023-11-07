import React from "react";
import { State } from "../../state/State";
import { useStore } from "../../state/Store";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ButtonMenu from "./ButtonMenu";
import { FormatListBulleted } from "@mui/icons-material";
import { createIHGraphFromJSONString } from "ihgraph";
import { useReactFlow } from "reactflow";

const examples = [
    {
        id: 1,
        name: "Example 1",
        value: "{\"annotations\":{},\"nodes\":[{\"annotations\":{},\"id\":\"1\",\"content\":\"var x = 1;\"}],\"edgeTypes\":[{\"annotations\":{},\"id\":\"sequence\",\"priority\":8,\"immediate\":false},{\"annotations\":{},\"id\":\"execute\",\"priority\":2,\"immediate\":false}],\"edges\":[]}",
    },
    {
        id: 2,
        name: "Example 2",
        value: "{\"annotations\":{},\"nodes\":[{\"annotations\":{},\"id\":\"1\",\"content\":\"var x = 1;\"},{\"annotations\":{},\"id\":\"2\",\"content\":\"x + 2;\"},{\"annotations\":{},\"id\":\"3\",\"content\":\"\"}],\"edgeTypes\":[{\"annotations\":{},\"id\":\"sequence\",\"priority\":8,\"immediate\":false},{\"annotations\":{},\"id\":\"execute\",\"priority\":2,\"immediate\":false}],\"edges\":[{\"annotations\":{},\"edgeType\":\"sequence\",\"sourceNode\":\"1\",\"targetNode\":\"2\"},{\"annotations\":{},\"edgeType\":\"execute\",\"sourceNode\":\"2\",\"targetNode\":\"3\"}]}",
    },
];

export default function MenuExamples(): React.JSX.Element {
    const open: boolean = useStore((state: State) => state.menuExamples.open);
    const menuOpenToggle = useStore((state: State) => state.menuExamples.menuOpenToggle);
    const {getNode, fitView} = useReactFlow();
    const render = useStore((state: State) => (ihGraphAsJson: string) => {
        state.compilation.render(
            createIHGraphFromJSONString(ihGraphAsJson),
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
