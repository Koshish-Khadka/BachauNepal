"use client";
import { getAllResources, getResourcesByDisasterId } from "@/actions/resource";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ResourceContextType = {
  resources: resourceDataType[];
  setResources: React.Dispatch<React.SetStateAction<resourceDataType[]>>;
  handleDisasterClick: (disasterID: string) => Promise<void>;
  selectDisaster: DisasterResource[];
  isResourceShown: boolean;
  setIsResourceShown: React.Dispatch<React.SetStateAction<boolean>>;
};
export type resourceDataType = {
  id: string;
  created_at: string;
  title: string;
  type: string;
  description: string;
  lat: number;
  lng: number;
  contactnum: string;
  capacity: string | number;
  created_by: string;
};
type DisasterResource = {
  id: string;
  created_at: string;
  title: string;
  disaster_id: string;
  type: string;
  description: string;
  lat: number;
  lng: number;
  contactnum: string;
  capicity: string | number;
  created_by: string;
};

export const ResourceContext = createContext<ResourceContextType | null>(null);

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<resourceDataType[]>([]);
  const [selectDisaster, setSelectDisaster] = useState<DisasterResource[]>([]);
  const [isResourceShown, setIsResourceShown] = useState<boolean>(true);

  // console.log("Filter status", isResourceShown);

  // console.log("Selected Disaster detail", selectDisaster);
  // Fetch all resources
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const result = await getAllResources();
        if (result.status === "success") {
          // console.log("Resources:", result.data);
          setResources(result.data || []);
        } else {
          console.log("Error fetching resources:", result.message);
        }
      } catch (error) {
        console.log("Failed to fetch Resources", error);
      }
    };
    fetchResources();
  }, []);

  // Fetch resources by disaster ID
  const handleDisasterClick = async (disasterID: string) => {
    try {
      const resource = await getResourcesByDisasterId(disasterID);
      if (resource.status === "success") {
        // console.log("Resource by id:", resource.data);
        setSelectDisaster(resource.data || []);
      } else {
        console.log("Error fetching resource by id:", resource.message);
      }
    } catch (error) {
      console.log("Failed to fetch resource by id", error);
    }
  };
  return (
    <ResourceContext.Provider
      value={{
        resources,
        setResources,
        handleDisasterClick,
        selectDisaster,
        isResourceShown,
        setIsResourceShown,
      }}
    >
      {children}
    </ResourceContext.Provider>
  );
};

export const useResource = () => {
  const context = useContext(ResourceContext);
  if (!context) {
    throw new Error("useResource must be used within a ResourceProvider");
  }
  return context;
};
