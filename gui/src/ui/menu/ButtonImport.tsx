import React from "react";
import { Publish } from "@mui/icons-material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { Box, IconButton, Tooltip } from "@mui/material";
import { VisuallyHiddenInput } from "../util/VisuallyHiddenInput";
import { menuWidth } from "./Menu";
import { createIHGraphFromJSONString } from "ihgraph";
import { ReactFlowInstance, useReactFlow } from "reactflow";

export default function ButtonImport(): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    const render = useStore((state: State) => (name: string, ihGraph: string) => {
        state.flow.render(
            createIHGraphFromJSONString(ihGraph),
            reactFlow.fitView,
            name,
        );
    });
    const handleChange = (target: EventTarget & HTMLInputElement): void => {
        if (target.files == null) {
            throw new Error("Files are null");
        }
        const file = target.files[0];
        file.text().then((text: string) => render(file.name, text));
    };
    return (
        <Box
            style={{
                height: 32,
                marginTop: 16,
                textAlign: "center",
                width: menuWidth,
            }}
        >
            <Tooltip
                title={"Import IhGraph"}
                placement={"right"}
            >
                <IconButton
                    component={"label"}
                    size={"large"}
                >
                    <Publish/>
                    <VisuallyHiddenInput
                        accept={"application/json"}
                        type="file"
                        onChange={(e) => handleChange(e.target)}
                    />
                </IconButton>
            </Tooltip>
        </Box>
    );
}
