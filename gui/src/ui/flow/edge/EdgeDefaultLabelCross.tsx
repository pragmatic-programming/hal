import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconDynamic } from "../../util/IconDynamic";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { ReactFlowInstance, useReactFlow } from "reactflow";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import RedoIcon from "@mui/icons-material/Redo";
import CallMadeIcon from "@mui/icons-material/CallMade";
import MovingIcon from "@mui/icons-material/Moving";
import EdgeDefaultLabelCrossButton from "./EdgeDefaultLabelCrossButton";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { Autorenew } from "@mui/icons-material";
import { EdgePathStyle } from "../../../model/edge/EdgePathStyle";

interface Props {
    edgeDefinition: EdgeDefinition;
    edgePathStyle: EdgePathStyle;
    id: string;
}

export function EdgeDefaultLabelCross(props: Props): React.JSX.Element {
    const reactFlow: ReactFlowInstance = useReactFlow();
    const setEdgePathStyleForEdge = useStore((state: State) => state.flow.setEdgePathStyleForEdge);
    const [showCross, setShowCross] = useState<boolean>(false);
    const icon: React.JSX.Element =
        <div
            onMouseEnter={() => setShowCross(true)}
        >
            <BoxBackgroundMain>
                <IconDynamic
                    iconDefault={props.edgeDefinition.icon}
                    iconHover={DeleteIcon}
                    onClick={() => reactFlow.deleteElements({edges: [{id: props.id}]})}
                />
            </BoxBackgroundMain>
        </div>;
    if (showCross) {
        return (
            <div
                onMouseLeave={() => setShowCross(false)}
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 40px)",
                    gridTemplateRows: "repeat(3, 40px)",
                    gap: "0px",
                    margin: "0px auto",
                }}
            >
                <div/>
                <EdgeDefaultLabelCrossButton
                    disabled={props.edgePathStyle === props.edgeDefinition.edgePathStyle}
                    onClick={() => setEdgePathStyleForEdge(props.id, props.edgeDefinition.edgePathStyle)}
                    icon={Autorenew}
                    placement={"top"}
                    tooltip={"Default (" + props.edgeDefinition.edgePathStyle + ")"}
                />
                <div/>
                <EdgeDefaultLabelCrossButton
                    disabled={props.edgePathStyle === "Bezier"}
                    onClick={() => setEdgePathStyleForEdge(props.id, "Bezier")}
                    icon={RedoIcon}
                    placement={"left"}
                    tooltip={"Bezier"}
                />
                {icon}
                <EdgeDefaultLabelCrossButton
                    disabled={props.edgePathStyle === "Straight"}
                    onClick={() => setEdgePathStyleForEdge(props.id, "Straight")}
                    icon={CallMadeIcon}
                    placement={"right"}
                    tooltip={"Straight"}
                />
                <div/>
                <EdgeDefaultLabelCrossButton
                    disabled={props.edgePathStyle === "Smooth"}
                    icon={MovingIcon}
                    onClick={() => setEdgePathStyleForEdge(props.id, "Smooth")}
                    placement={"bottom"}
                    tooltip={"Smooth"}
                />
                <div/>
            </div>
        );
    }
    return icon;
}