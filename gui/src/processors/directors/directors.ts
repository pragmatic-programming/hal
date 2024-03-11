import { Director } from "./Director";
import { HALGraphProcessor } from "./HALGraphProcessor";
import MovingIcon from '@mui/icons-material/Moving';
import AltRouteIcon from '@mui/icons-material/AltRoute';

export const directors: Director[] = [
    {
        id: 1,
        name: "Flow Graph Director",
        processor: HALGraphProcessor,
        icon: MovingIcon,
    },
    {
        id: 2,
        name: "Priority Subgraph Director",
        processor: HALGraphProcessor,
        icon: AltRouteIcon,
    }
];