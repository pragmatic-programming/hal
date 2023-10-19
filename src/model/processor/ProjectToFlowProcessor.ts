import { Processor } from "kico";
import { Project } from "../Project";
import { Edge, Node } from "reactflow";
import { Editor } from "../Editor";
import { FlowState } from "../../State";
import { Edge as InternalEdge } from "../Edge";

export class ProjectToFlowProcessor extends Processor<Project, FlowState> {

    process() {
        const project: Project = this.getModel();
        const nodes: Node[] = [];
        for (const editor of project.editors()) {
            if (!editor.value) {
                throw new Error("Editor value is undefined");
            }
            nodes.push(this.node(editor));
        }
        const edges: Edge[] = [];
        for (const edge of project.edges()) {
            edges.push(this.edge(edge));
        }
        this.setModel(new FlowState(
            nodes,
            edges
        ));
    }

    private node(editor: Editor): Node {
        return {
            id: editor.id.toString(),
            position: editor.position,
            width: editor.dimension.width,
            height: editor.dimension.height,
            data: {value: editor.value},
            type: 'textUpdater'
        };
    }

    private edge(edge: InternalEdge): Edge {
        const source = edge.from.toString();
        const target = edge.to.toString();
        return {id: source + "-" + target, source: source, target: target};
    }

    getId() {
        return "hal.flow";
    }

    getName() {
        return "Flow";
    }
}
