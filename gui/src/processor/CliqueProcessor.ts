/********************************************************************************
 * Copyright (c) 2023 ssm.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

import * as ihgraph from "ihgraph";
import * as kico from "kico";

export class CliqueProcessor extends ihgraph.TransformationProcessor {

    public static readonly NEXT_CLIQUE: kico.Property<ihgraph.IHGraph | null> =
        new kico.Property<ihgraph.IHGraph | null>("HAL.clique.next", () => null);
    public static readonly NEW_CLIQUE: kico.Property<ihgraph.IHGraph | null> =
        new kico.Property<ihgraph.IHGraph | null>("HAL.clique.new", () => null);


    public getNextClique(): ihgraph.IHGraph {
        const clique = this.getProperty(CliqueProcessor.NEXT_CLIQUE);

        if (clique == null) {
            throw new Error("Next clique is empty!");
        }

        return clique;
    }

    public setNewClique(clique: ihgraph.IHGraph): void {
        this.setProperty(CliqueProcessor.NEW_CLIQUE, clique);
        this.executeCliqueReplacement();
    }

    public getSourceNodes(): ihgraph.SourceNode[] {
        const graph = this.getNextClique();
        return graph.getSourceNodes().filter(node => node.getOutgoingEdges().length > 0);
    }

    public getTargetNodes(): ihgraph.SourceNode[] {
        const graph = this.getNextClique();
        return graph.getSourceNodes().filter(node => node.getIncomingEdges().length > 0);
    }

    public getCliqueNodes(): ihgraph.SourceNode[] {
        const visited = new Set<ihgraph.SourceNode>();
        const result = new Array<ihgraph.SourceNode>();

        const nodes = this.getModel().getRootNodes();
        while(nodes.length > 0) {
            const node: ihgraph.SourceNode = nodes[0]
            visited.add(node);
            const newNodes = node.getOutgoingEdges()
                .filter(edge => edge.getTargetNode() instanceof ihgraph.SourceNode)
                .map(edge => edge.getTargetNode() as ihgraph.SourceNode)
                .filter(node => !visited.has(node) && !nodes.includes(node));
            result.push(nodes.shift()!);
            nodes.push(...newNodes);
        }

        return result;
    }

    public executeCliqueReplacement(): void {
        const newClique = this.getProperty(CliqueProcessor.NEW_CLIQUE);
        const nextClique = this.getProperty(CliqueProcessor.NEXT_CLIQUE);

        if (newClique != null && nextClique != null) {
            const graph = this.getModel()
            graph.replaceClique(nextClique, newClique);
            this.setModel(graph);
        }
    }

    protected getContents(): ihgraph.SourceNodeContent[] {
        const contents: ihgraph.SourceNodeContent[] = [];

        const graph = this.getNextClique();
        graph.getSourceNodes().forEach(node => {
            const content = node.getContent();
            contents.push(content);
        });

        return contents;
    }

    protected createTargetGraph(): ihgraph.IHGraph {
        return new ihgraph.IHGraph();
    }
}
