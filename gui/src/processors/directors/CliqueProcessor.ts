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

import { IHGraph, SimpleNode, SimpleNodeContent, assert } from "@pragmatic-programming/ihgraph";
import { Property } from "@pragmatic-programming/kico";
import { DirectorProcessor } from "./DirectorProcessor";

export class CliqueProcessor extends DirectorProcessor {

    // The clique that was identified by the CSP. This is used for the replacement.
    public static readonly NEXT_CLIQUE_ORIGIN: Property<IHGraph | null> =
        new Property<IHGraph | null>("HAL.clique.next.origin", () => null);
    
    // The current working copy of the next clique.
    public static readonly NEXT_CLIQUE: Property<IHGraph | null> =
        new Property<IHGraph | null>("HAL.clique.next", () => null);

    // The new clique that will replace the old clique.
    public static readonly NEW_CLIQUE: Property<IHGraph | null> =
        new Property<IHGraph | null>("HAL.clique.new", () => null);

    // The next clique is a model extension. (obsolete?)
    public static readonly NEXT_CLIQUE_MODEL_EXTENSION: Property<boolean> =
        new Property<boolean>("HAL.clique.next.model.extension", () => true);


    // protected getCurrentClique(): IHGraph {
    //     const graph = this.getModel();
    //     const nextClique = this.getNextClique();

    //     if (nextClique == null) {
    //         return graph;
    //     } else {
    //         return graph.getClique(nextClique.);
    //     }

    //     return graph;
    // }

    protected getCurrentClique(): IHGraph {
        return this.getNextClique();
    }


    protected getNextClique(): IHGraph {
        const clique = this.getProperty(CliqueProcessor.NEXT_CLIQUE);

        if (clique == null) {
            if (this.getProperty(CliqueProcessor.NEXT_CLIQUE_MODEL_EXTENSION)) {
                return this.getModel();
            } else {
                throw new Error("Next clique is empty!");
            }
        }

        return clique;
    }

    protected setNextClique(clique: IHGraph): void {
        this.setProperty(CliqueProcessor.NEXT_CLIQUE, clique);
    }

    protected setNewClique(clique: IHGraph): void {
        this.setProperty(CliqueProcessor.NEW_CLIQUE, clique);
        this.executeCliqueReplacement();
    }

    protected isImmediate(): boolean {
        const graph = this.getNextClique();
        return graph.getEdgeTypes().every(edgeType => edgeType.isImmediate());
    }

    protected set(): void {
        this.setNewClique(this.getNextClique());
    }

    protected getSourceNodes(): SimpleNode[] {
        const graph = this.getNextClique();
        return graph.getSimpleNodes().filter(node => node.getIncomingEdges().length === 0);
    }

    protected getTargetNodes(): SimpleNode[] {
        const graph = this.getNextClique();
        return graph.getSimpleNodes().filter(node => node.getIncomingEdges().length > 0);
    }

    protected getCliqueNodes(): SimpleNode[] {
        const visited = new Set<SimpleNode>();
        const result = new Array<SimpleNode>();

        const nodes = this.getSourceNodes();
        while(nodes.length > 0) {
            const node: SimpleNode = nodes[0]
            visited.add(node);
            const newNodes = node.getOutgoingEdges()
                .filter(edge => edge.getTargetNode() instanceof SimpleNode)
                .map(edge => edge.getTargetNode() as SimpleNode)
                .filter(node => !visited.has(node) && !nodes.includes(node));
            result.push(nodes.shift()!);
            nodes.push(...newNodes);
        }

        return result;
    }

    protected executeCliqueReplacement(): void {
        const nextClique = this.getProperty(CliqueProcessor.NEXT_CLIQUE_ORIGIN);
        const newClique = this.getProperty(CliqueProcessor.NEW_CLIQUE);

        if (newClique != null && nextClique != null) {
            const graph = this.getModel()
            graph.replaceClique(nextClique, newClique);
            assert(graph.consistency());
            this.setModel(graph);
        }
    }

    protected getContents(): SimpleNodeContent[] {
        const contents: SimpleNodeContent[] = [];

        const graph = this.getNextClique();
        graph.getSimpleNodes().forEach(node => {
            const content = node.getContent();
            contents.push(content);
        });

        return contents;
    }

    protected createTargetGraph(): IHGraph {
        return new IHGraph();
    }
}
