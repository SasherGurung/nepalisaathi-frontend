"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import { useState } from "react";
import L from "leaflet";


type Props = {
  onLocationSelect: (location: {
    lat: number;
    lng: number;
  }) => void;
};

function LocationMarker({ onLocationSelect }: Props) {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);

      onLocationSelect({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return position ? <Marker position={position} /> : null;
}

export default function Map() {
  return (
    <MapContainer
  center={[27.7172, 85.324]}
  zoom={13}
  style={{
    width: "100%",
    height: "400px",
  }}
>
  <TileLayer
    attribution="© OpenStreetMap contributors"
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />

</MapContainer>
  );
}