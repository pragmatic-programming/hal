import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ButtonIconTooltip from "../util/ButtonIconTooltip";
import { useStore } from "../../state/Store";
import { State } from "../../state/State";
import { flowToIHGraph } from "../../processors/compilationContexts";
import { StateFlow } from "../../state/flow/StateFlow";
import MenuButtonBox from "./MenuButtonBox";
import { CompilationContext } from "@pragmatic-programming/kico";
import { IHGraph } from "@pragmatic-programming/ihgraph";

export default function MenuButtonExport(): React.JSX.Element {
    const stateFlow: StateFlow = useStore((state: State) => state.flow);
    return (
        <MenuButtonBox>
            <ButtonIconTooltip
                title={"Export"}
                placement={"right"}
                size={"large"}
                onClick={(): void => {
                    // serialize graph
                    const compilationContext: CompilationContext = flowToIHGraph(stateFlow);
                    compilationContext.compile();
                    const graph: IHGraph = compilationContext.getResult();
                    const serialized: string = graph.serialize(true);
                    // prepare blob from graph
                    const blob: Blob = new Blob([serialized], {type: "application/json"});
                    // create download link
                    const link: HTMLAnchorElement = document.createElement("a");
                    link.download = "graph.json";
                    link.href = window.URL.createObjectURL(blob);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }}
            >
                <FileDownloadIcon/>
            </ButtonIconTooltip>
        </MenuButtonBox>
    );
}
