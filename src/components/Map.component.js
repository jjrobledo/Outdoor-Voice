import React, { useState } from "react";
import MapGL from "@urbica/react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 37.78,
    longitude: -122.41,
    zoom: 11,
  });

  return (
    <MapGL
      style={{ width: "75vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/light-v9"
      accessToken={""}
      latitude={37.78}
      longitude={-122.41}
      zoom={11}
      onViewportChange={setViewport}
    />
  );
}
