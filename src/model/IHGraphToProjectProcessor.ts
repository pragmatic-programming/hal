import { Processor } from "kico";
import { Project } from "./Project";
import { IHGraph } from "ihgraph";
import { Editor } from "./Editor";
import { Position } from "./Position";
import { Editors } from "./Editors";
import { Edges } from "./Edges";
import { Edge } from "./Edge";

export class IHGraphToProjectProcessor extends Processor<IHGraph, Project> {

    process() {
        const model = this.getModel();
        const map = new Map<number, Editor>();
        for (const sourceNode of model.getSourceNodes()) {
            let id = Number(sourceNode.getId());
            map.set(
                id,
                new Editor(
                    id,
                    {width: 200, height: 300},
                    new Position(5, 5),
                    "javascript",
                    sourceNode.getContent()
                )
            );
        }
        const edges: Edge[] = [];
        for (const edge of model.getEdges()) {
            const sourceId = edge.getSourceNode().getId();
            const targetId = edge.getTargetNode().getId();
            if (!sourceId) {
                throw new Error("Returned sourceId is undefined");
            }
            if (!targetId) {
                throw new Error("Returned targetId is undefined");
            }
            const source = map.get(Number(sourceId));
            const target = map.get(Number(targetId));
            if (!source) {
                throw new Error("Returned sourceNode is undefined");
            }
            if (!target) {
                throw new Error("Returned targetNode is undefined");
            }
            edges.push(Edge.create(source, target));
        }
        this.setModel(new Project(
            "name",
            new Editors(map),
            new Edges(edges)
        ));
    }

    getId() {
        return "hal.ihgraph";
    }

    getName() {
        return "IHGraph";
    }
}
