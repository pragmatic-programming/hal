import { Language } from "./Languages";
import { nodeType } from "../ui/flow/flow/NodeTypes";

export default interface NodeData {
    //todo content is redundant
    content: string | undefined,
    label: string,
    language: Language,
    width: number,
    height: number,
    type: nodeType,
}
