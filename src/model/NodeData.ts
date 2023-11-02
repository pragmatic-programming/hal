import { Language } from "./Languages";

export default interface NodeData {
    content: string | undefined,
    label: string,
    language: Language
}
