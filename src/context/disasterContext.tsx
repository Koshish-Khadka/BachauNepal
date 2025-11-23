"use client";

import { getAllDisasters } from "@/actions/disaster";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Disaster = {
  id: string;
  created_by: string;
  description: string;
  enddate: string;
  lat: number;
  lng: number;
  startdate: string;
  title: string;
  status: string;
  location: string;
  radius: number;
  type: string;
};

type DisasterContextType = {
  disasters: Disaster[];
  setDisasters: React.Dispatch<React.SetStateAction<Disaster[]>>;
  isDisasterShown: boolean;
  setIsDisasterShown: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DisasterContext = createContext<DisasterContextType | null>(null);

export const DisasterProvider = ({ children }: { children: ReactNode }) => {
  const [disasters, setDisasters] = useState<Disaster[]>([]);
  const [isDisasterShown, setIsDisasterShown] = useState<boolean>(false);

  // Fetch Disaster Data
  useEffect(() => {
    const fetchDisasters = async () => {
      const response = await getAllDisasters();
      if (response.status === "success") {
        // console.log(response.data);
        setDisasters(response.data || []);
      } else {
        console.log("Failed to fetch disaster", response.message);
      }
    };
    fetchDisasters();
  }, []);
  return (
    <DisasterContext.Provider
      value={{ disasters, setDisasters, isDisasterShown, setIsDisasterShown }}
    >
      {children}
    </DisasterContext.Provider>
  );
};

export const useDisaster = () => {
  const context = useContext(DisasterContext);
  if (!context) {
    throw new Error("useDisaster must be used within a DisasterProvider");
  }
  return context;
};
