import "./App.css";
import { MapProvider } from "react-map-gl";
import MapView from "./components/Map.component";
import Navbar from "./components/Navbar.component";

function App() {
  return (
    <MapProvider>
      <Navbar />
      <MapView />
    </MapProvider>
  );
}

export default App;
