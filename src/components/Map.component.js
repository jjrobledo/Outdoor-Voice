import * as React from "react";
import Map, { Marker } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export default function MapView() {
  const [viewState, setViewState] = React.useState({
    latitude: 32.417934,
    longitude: -104.229034,
    zoom: 11,
  });

  const { REACT_APP_MAPBOX } = process.env;

  return (
    <Map
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/outdoors-v11"
      mapboxAccessToken={REACT_APP_MAPBOX}
    >
      <Marker longitude={-122.4} latitude={37.8} color="red" />
    </Map>
  );
}
