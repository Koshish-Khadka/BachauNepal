"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer } from "react-leaflet";

export default function Map() {
  return (
    <MapContainer
      center={[27.7103, 85.3222]}
      zoom={13}
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
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
}
