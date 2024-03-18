import React, { CSSProperties } from "react";
import { NodeProps, ReactFlowInstance, useReactFlow } from "reactflow";
import { AttachFile } from "@mui/icons-material";
import { NodeDataFile } from "../../../model/node/NodeData";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { BoxBorder } from "../../util/BoxBorder";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import { IconButton, Theme, useTheme } from "@mui/material";
import { borderColor } from "../../../util";
import DeleteIcon from "@mui/icons-material/Delete";
import { ButtonIconDynamic } from "../../util/ButtonIconDynamic";
import HandleSourceRight from "../handle/HandleSourceRight";
import HandleSourceBottom from "../handle/HandleSourceBottom";
import { SimpleNodeStatus } from "@pragmatic-programming/ihgraph";
import { VisuallyHiddenInput } from "../../util/VisuallyHiddenInput";

const padding: CSSProperties = {padding: 30};

export default function NodeFile(props: NodeProps<NodeDataFile>): React.JSX.Element {
    const theme: Theme = useTheme();
    const reactFlow: ReactFlowInstance = useReactFlow();
    const setNodeNodeDataContent = useStore((state: State) => state.flow.setNodeNodeDataContent);
    const handleChange = (target: EventTarget & HTMLInputElement): void => {
        if (target.files == null) {
            throw new Error("Files are null");
        }
        target.files[0].text().then((text: string) => setNodeNodeDataContent(props.id, text));
    };
    let icon =
        <ButtonIconDynamic
            iconDefault={AttachFile}
            iconHover={DeleteIcon}
            onClick={() => reactFlow.deleteElements({nodes: [{id: props.id}]})}
            size={"medium"}
            tooltip={"Delete File Node"}
        />;

    if (props.data.content === undefined) {
        icon = <IconButton component="label">
            <AttachFile/>
            <VisuallyHiddenInput
                accept={"plain/text"}
                type="file"
                onChange={(e) => handleChange(e.target)}
            />
        </IconButton>;
    }
    return (
        <>
            <HandleSourceRight
                nodeId={props.id}
            />
            <HandleSourceBottom
                nodeId={props.id}
            />
            <BoxBorder
                borderColor={borderColor(SimpleNodeStatus.UNDEFINED, props.selected, theme, theme.palette.primary.main)}
            >
                <BoxBackgroundMain
                    style={padding}
                >
                    {icon}
                </BoxBackgroundMain>
            </BoxBorder>

        </>
    );
}
