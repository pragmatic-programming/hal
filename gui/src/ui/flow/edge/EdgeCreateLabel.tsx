import React, { useState } from "react";
import { IconButton, SvgIcon, Tooltip } from "@mui/material";
import { useStore } from "../../../state/Store";
import { State } from "../../../state/State";
import { Add } from "@mui/icons-material";
import { edgeDefinitions } from "../../../model/edge/edgeDefinitions";
import { EdgeDefinition } from "../../../model/edge/EdgeDefinition";
import { firstCharUpperCase } from "../../../util";
import { EdgeTypeIndicator } from "../../../model/edge/EdgeTypeIndicator";
import { EdgePath } from "../../../model/edge/EdgePath";
import { BoxBackgroundMain } from "../../util/BoxBackgroundMain";

interface Props {
    deniedEdgeTypes: EdgeTypeIndicator[];
    edgePath: EdgePath;
    id: string;
    targetNodeId: string;
}

export default function EdgeCreateLabel(props: Props): React.JSX.Element {
    const [numberOfShownEdgeDefinitions, setNumberOfShownEdgeDefinitions] = useState<number>(4);
    const transformCreationEdge = useStore((state: State) => state.flow.transformCreateEdge);
    const filteredEdgeDefinitions: EdgeDefinition[] = edgeDefinitions.filter((edgeDefinition: EdgeDefinition): boolean => edgeDefinition.type !== "create" && !props.deniedEdgeTypes.includes(edgeDefinition.type));
    return (
        <BoxBackgroundMain>
            {filteredEdgeDefinitions
                .slice(0, numberOfShownEdgeDefinitions)
                .map((edgeDefinition: EdgeDefinition) =>
                    <Tooltip
                        key={edgeDefinition.type}
                        placement="top"
                        title={"Create new " + firstCharUpperCase(edgeDefinition.type) + " Edge"}
                    >
                        <IconButton
                            onClick={() => transformCreationEdge(props.id, edgeDefinition, props.targetNodeId,)}
                        >
                            <SvgIcon component={edgeDefinition.icon}></SvgIcon>
                        </IconButton>
                    </Tooltip>
                )
            }
            <Tooltip
                placement="top"
                title={"Open new Edge Dialog"}
            >
                <IconButton
                    disabled={numberOfShownEdgeDefinitions >= filteredEdgeDefinitions.length}
                    onClick={() => setNumberOfShownEdgeDefinitions(numberOfShownEdgeDefinitions + 2)}
                >
                    <Add/>
                </IconButton>
            </Tooltip>
        </BoxBackgroundMain>
    );
}

