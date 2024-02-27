import React, { useState } from "react";
import { SvgIcon } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { Add } from "@mui/icons-material";
import { defaultEdgeDefinitions } from "../../../model/edge/edgeDefinitions";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { firstCharUpperCase } from "../../../util";
import { EdgePath } from "../../../model/edge/EdgePath";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";
import TooltipIconButton from "../../util/TooltipIconButton";

interface Props {
    deniedEdgeTypes: string[];
    edgePath: EdgePath;
    id: string;
    targetNodeId: string;
}

export default function EdgeCreateLabel(props: Props): React.JSX.Element {
    const [numberOfShownEdgeDefinitions, setNumberOfShownEdgeDefinitions] = useState<number>(4);
    const transformCreationEdge = useStore((state: State) => state.flow.transformCreateEdge);
    const filteredEdgeDefinitions: EdgeDefinition[] = Object.values(defaultEdgeDefinitions).filter(
        (edgeDefinition: EdgeDefinition): boolean => edgeDefinition.type !== "create" && !props.deniedEdgeTypes.includes(edgeDefinition.type)
    );
    return (
        <BoxBackgroundMain>
            {filteredEdgeDefinitions
                .slice(0, numberOfShownEdgeDefinitions)
                .map((edgeDefinition: EdgeDefinition) =>
                    <TooltipIconButton
                        key={edgeDefinition.type}
                        onClick={() => transformCreationEdge(props.id, edgeDefinition, props.targetNodeId,)}
                        placement="top"
                        title={"Create new " + firstCharUpperCase(edgeDefinition.type) + " Edge"}
                    >
                        <SvgIcon component={edgeDefinition.icon}></SvgIcon>
                    </TooltipIconButton>
                )
            }
            <TooltipIconButton
                disabled={numberOfShownEdgeDefinitions >= filteredEdgeDefinitions.length}
                onClick={() => setNumberOfShownEdgeDefinitions(numberOfShownEdgeDefinitions + 2)}
                placement="top"
                title={"Open new Edge Dialog"}
            >
                <Add/>
            </TooltipIconButton>
        </BoxBackgroundMain>
    );
}

