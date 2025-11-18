"use client";

import { resourceDataType } from "@/app/page";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

export default function Map({ resources }: { resources: resourceDataType[] }) {
  // console.log("Map component", resources);

  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const flagIcon = L.icon({
    iconUrl: "/images/flag2.png", // Public folder path
    iconSize: [32, 32], // Adjust size
    iconAnchor: [16, 32], // Anchor at bottom-center
    popupAnchor: [0, -32], // Popup above icon
  });

  if (!location) {
    return <div>Loading map...</div>;
  }

  return (
    <MapContainer
      center={
        location
          ? [Number(location.lat.toFixed(4)), Number(location.lng.toFixed(4))]
          : [27.7172, 85.324]
      }
      zoom={16}
      zoomControl={false}
      className="w-full h-screen"
    >
      {/* <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        /> */}
      {/* <TileLayer
        attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/default0015/cm4d5pyoh01kg01si8aim9per/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGVmYXVsdDAwMTUiLCJhIjoiY2syZXg5dXp6MDY5cTNjcGFxaG00eXZ0OCJ9.SxcmP6OzJZ2bbjttSM6moA`}
      /> */}

      <TileLayer
        attribution='Imagery &copy; <a href="https://www.amantech.com.np/">Amantech</a>'
        url="https://api.mapbox.com/styles/v1/default0015/cmbrpdtii00ze01sd5qgqe1dj/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGVmYXVsdDAwMTUiLCJhIjoiY2syZXg5dXp6MDY5cTNjcGFxaG00eXZ0OCJ9.SxcmP6OzJZ2bbjttSM6moA"
      />

      {resources.map((item, index) => (
        <Marker key={index} position={[item.lat, item.lng]} icon={flagIcon}>
          <Popup>{item.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
