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

import { Processor, Property } from "@pragmatic-programming/kico";
import { CliqueProcessor } from "./CliqueProcessor";

export class CliqueSelectionProcessor extends CliqueProcessor {

    public static readonly CSP_LOG: Property<boolean> =
        new Property<boolean>("HAL.CSP.log", () => false);
    public static readonly CSP_MAX_ITERATIONS: Property<number> =
        new Property<number>("HAL.CSP.maxIterations", () => 10);
    public static readonly CSP_ITERATIONS: Property<number> =
        new Property<number>("HAL.CSP.iterations", () => 0);

    public getId(): string {
        return "CliqueSelectionProcessor";
    }

    public getName(): string {
        return "Clique Selection";
    }

    public process() {
        const iterations = this.getProperty(CliqueSelectionProcessor.CSP_ITERATIONS);
        const maxIterations = this.getProperty(CliqueSelectionProcessor.CSP_MAX_ITERATIONS);
        if (iterations > maxIterations) {
            throw new Error("Maximum number of iterations exceeded!");
        }
        this.setProperty(CliqueSelectionProcessor.CSP_ITERATIONS, iterations + 1);

        const graph = this.getModel();

        // Ignore edges with priority 0 (or less)
        const compilationEdges = graph.getEdges().filter((edge) => edge.getType().getPriority() > 0);

        if (compilationEdges.length < 1) {
            return;
        }

        const clique = this.getModel().getNextClique();
        const edgeType = clique.getEdges()[0].getType();
        const transformationConfiguration = clique.getTransformationConfiguration();
        const processorType = transformationConfiguration.get(edgeType);
        this.setProperty(CliqueProcessor.NEXT_CLIQUE_ORIGIN, clique);
        this.setProperty(CliqueProcessor.NEXT_CLIQUE, clique);

        if (processorType === undefined) {
            throw new Error("No processor mapped for edge type " + edgeType.getId());
        }

        if (this.getProperty(CliqueSelectionProcessor.CSP_LOG)) {
            console.log("CSP");
            console.log("Selected processor " + processorType + " for clique " + clique);
            console.log("Graph is " + this.getModel());
        }

        const processor = this.getCompilationContext().appendProcessor(processorType as typeof Processor);
        processor.addPostProcessor(CliqueSelectionProcessor);
        this.setProperty(CliqueProcessor.NEW_CLIQUE, null);
    }
}
