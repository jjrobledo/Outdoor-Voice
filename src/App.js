import "./App.css";
import { MapProvider } from "react-map-gl";
import MapView from "./components/Map.component";
import Controls from "./components/MapControls.component";

function App() {
  return (
    <MapProvider>
      <Controls />
      <MapView />
    </MapProvider>
  );
}

export default App;
