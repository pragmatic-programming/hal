import { useOnViewportChange, Viewport } from "reactflow";
import { useStore } from "../state/Store";

//todo find a better way than introducing a logger component
export function ViewportChangeLogger() {
    const setZoom = useStore(state => state.flow.setZoom);
    useOnViewportChange({
        onChange: (viewport: Viewport) => setZoom(viewport.zoom),
    });

    return null;
}
