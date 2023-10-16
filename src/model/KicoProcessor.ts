import { Processor } from "kico";
import { Project } from "./Project";
import { IHGraph } from "../../../ihgraph";

export class KicoProcessor extends Processor<Project, IHGraph> {

    getId(){
        return "kico.identity";
    }

    getName(){
        return "Identity";
    }
}
