import React from "react";
import { Publish } from "@mui/icons-material";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { IconButton, Tooltip } from "@mui/material";
import { VisuallyHiddenInput } from "../util/VisuallyHiddenInput";
import { createIHGraphFromJSONString } from "ihgraph";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import ButtonMenuBox from "./ButtonMenuBox";

export default function ButtonImport(): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    const render = useStore((state: State) => (name: string, ihGraph: string) => {
        state.flow.render(
            createIHGraphFromJSONString(ihGraph),
            reactFlow.fitView,
            name,
        );
    });
    return (
        <ButtonMenuBox>
            <Tooltip
                title={"Import"}
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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                            if (e.target.files == null) {
                                throw new Error("Files are null");
                            }
                            const file: File = e.target.files[0];
                            file.text().then((text: string) => render(file.name, text));
                        }}
                    />
                </IconButton>
            </Tooltip>
        </ButtonMenuBox>
    );
}
