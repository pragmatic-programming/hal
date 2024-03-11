import { CompilationContext } from "@pragmatic-programming/kico";
import { DirectorProcessor } from "../../processors/directors/DirectorProcessor";

export interface StateCompilation {
    context: CompilationContext,
    director: typeof DirectorProcessor,
    setDirector: (director: typeof DirectorProcessor) => void,
    run: () => void,
    options: {
        showHALProcessor: boolean,
        toggleShowHALProcessor: () => void,
    }
}
