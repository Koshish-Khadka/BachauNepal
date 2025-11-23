/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";
import "../app/globals.css";
import { useDisaster } from "@/context/disasterContext";
import { useResource } from "@/context/resourcesContext";

export default function Map() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const { disasters, isDisasterShown } = useDisaster();
  const { resources, handleDisasterClick, selectDisaster, isResourceShown } =
    useResource();
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

  const getDisasterIcon = (type: string) => {
    switch (type) {
      case "earthquake":
        return "images/earthquake.png";
      case "flood":
        return "images/flood.png";
      case "landslide":
        return "images/landslide.png";
      case "fire":
        return "images/fire.png";
      default:
        return "images/warning.png";
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "shelter":
        return "images/shelter.png";
      case "food":
        return "images/food.png";
      case "water":
        return "images/water-tap.png";
      case "fuel":
        return "images/fuel.png";
      case "hospital":
        return "images/hospital.png";
      case "police station":
        return "images/police-station.png";
      default:
        return "images/warning.png";
    }
  };

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
      <MarkerClusterGroup
        iconCreateFunction={(cluster: any) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `<div class="cluster-icon2">${count}</div>`,
            className: "custom-cluster2",
            iconSize: L.point(40, 40, true),
          });
        }}
      >
        {isResourceShown &&
          resources.map((item, index) => (
            <Marker
              key={index}
              position={[item.lat, item.lng]}
              icon={L.divIcon({
                className: "custom-marker",
                html: `<div class="marker-container2">
                                <div class="content2">
                                  <img src=${getResourceIcon(
                                    item.type
                                  )} alt="weather" class="icon2" />
                                </div>
                                <div class="marker-pointer2"></div>
                              </div>
                              <style>

                                .marker-container2 {
                                  position: relative;
                                }
                                
                                .content2 {
                                  background: #0988bb;
                                  border-radius: 50%;
                                  display:flex;
                                  flex-direction:column;
                                  padding: 4px;
                                  display: flex;
                                  align-items: center;
                                  width: 35px; 
                                  height: 35px;
                                  border: 2px solid #06668c;
                                }
                                
                                .icon2 {
                                  width: 20px;
                                  height: 20px;
                                  object-fit: contain;
                                }
                                
                                .marker-pointer2 {
                                  position: absolute;
                                  bottom: -8px;
                                  left: 50%;
                                  transform: translateX(-50%);
                                  width: 0;
                                  height: 0;
                                  border-left: 8px solid transparent;
                                  border-right: 8px solid transparent;
                                  border-top: 8px solid #06668c;
                                }
                                
                              
                              </style>
                            `,
                iconSize: [50, 58],
                iconAnchor: [35, 78],
              })}
            >
              <Popup>{item.title}</Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>
      <MarkerClusterGroup
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        iconCreateFunction={(cluster: any) => {
          const count = cluster.getChildCount();
          return L.divIcon({
            html: `<div class="cluster-icon">${count}</div>`,
            className: "custom-cluster",
            iconSize: L.point(40, 40, true),
          });
        }}
      >
        {isDisasterShown &&
          disasters.map((item, index) => (
            <Marker
              key={index}
              position={[item.lat, item.lng]}
              eventHandlers={{
                click: () => handleDisasterClick(item.id),
              }}
              icon={L.divIcon({
                className: "custom-marker",
                html: `<div class="marker-container">
                                <div class="content">
                                  <img src=${getDisasterIcon(
                                    item.type
                                  )} alt="weather" class="icon" />
                                </div>
                                <div class="marker-pointer"></div>
                              </div>
                              <style>

                                .marker-container {
                                  position: relative;
                                }
                                
                                .content {
                                  background: #f65c51;
                                  border-radius: 50%;
                                  display:flex;
                                  flex-direction:column;
                                  padding: 8px;
                                  display: flex;
                                  align-items: center;
                                  width: 50px; 
                                  height: 50px;
                                  border: 2px solid #b8453c;
                                }
                                
                                .icon {
                                  width: 32px;
                                  height: 32px;
                                  object-fit: contain;
                                }
                                
                                .marker-pointer {
                                  position: absolute;
                                  bottom: -8px;
                                  left: 50%;
                                  transform: translateX(-50%);
                                  width: 0;
                                  height: 0;
                                  border-left: 8px solid transparent;
                                  border-right: 8px solid transparent;
                                  border-top: 8px solid #f65c51;
                                }
                                
                              
                              </style>
                            `,
                iconSize: [50, 58],
                iconAnchor: [35, 78],
              })}
            >
              <Popup>{item.type}</Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>

      {/* Resources based on selected disaster */}

      {selectDisaster &&
        selectDisaster.map((item, index) => (
          <Marker
            key={index}
            position={[item.lat, item.lng]}
            icon={L.divIcon({
              className: "custom-marker",
              html: `<div class="marker-container2">
                                <div class="content2">
                                  <img src=${getResourceIcon(
                                    item.type
                                  )} alt="weather" class="icon2" />
                                </div>
                                <div class="marker-pointer2"></div>
                              </div>
                              <style>

                                .marker-container2 {
                                  position: relative;
                                }
                                
                                .content2 {
                                  background: #0988bb;
                                  border-radius: 50%;
                                  display:flex;
                                  flex-direction:column;
                                  padding: 4px;
                                  display: flex;
                                  align-items: center;
                                  width: 35px; 
                                  height: 35px;
                                  border: 2px solid #06668c;
                                }
                                
                                .icon2 {
                                  width: 20px;
                                  height: 20px;
                                  object-fit: contain;
                                }
                                
                                .marker-pointer2 {
                                  position: absolute;
                                  bottom: -8px;
                                  left: 50%;
                                  transform: translateX(-50%);
                                  width: 0;
                                  height: 0;
                                  border-left: 8px solid transparent;
                                  border-right: 8px solid transparent;
                                  border-top: 8px solid #06668c;
                                }
                                
                              
                              </style>
                            `,
              iconSize: [50, 58],
              iconAnchor: [35, 78],
            })}
          >
            <Popup>{item.title}</Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
