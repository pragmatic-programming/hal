import { SvgIconComponent } from "@mui/icons-material";
import { IHGraphFactoryInterface } from "ihgraph";

export interface Example {
    id: number,
    name: string,
    value: IHGraphFactoryInterface,
    icon: SvgIconComponent;
}
