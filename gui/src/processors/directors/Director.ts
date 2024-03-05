import { SvgIconComponent } from "@mui/icons-material";
import { HALGraphProcessor } from "./HALGraphProcessor";

export interface Director {
    id: number,
    name: string,
    processor: typeof HALGraphProcessor,
    icon: SvgIconComponent;
}
