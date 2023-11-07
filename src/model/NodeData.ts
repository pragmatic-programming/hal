import { Language } from "./Languages";

export default interface NodeData {
    //todo content is redundant
    content: string | undefined,
    label: string,
    language: Language,
    width: number,
    height: number,
}
