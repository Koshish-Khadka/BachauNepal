import { useDisaster } from "@/context/disasterContext";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

const FlyToDisaster = () => {
  const map = useMap();
  const { selectedDisaster } = useDisaster();

  useEffect(() => {
    if (selectedDisaster) {
      map.flyTo([selectedDisaster.lat, selectedDisaster.lng], 15, {
        duration: 5,
        easeLinearity: 0.25,
      });
    }
  }, [selectedDisaster]);

  return null;
};

export default FlyToDisaster;
