import { SvgIconComponent } from "@mui/icons-material";
import { IHGraphFactoryInterface } from "@pragmatic-programming/ihgraph";

export interface Example {
    id: number,
    name: string,
    value: IHGraphFactoryInterface,
    icon: SvgIconComponent;
}
