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
  isResourceShown: boolean;
  setIsResourceShown: React.Dispatch<React.SetStateAction<boolean>>;
  addResource: boolean;
  setAddResource: React.Dispatch<React.SetStateAction<boolean>>;
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

export const ResourceContext = createContext<ResourceContextType | null>(null);

export const ResourceProvider = ({ children }: { children: ReactNode }) => {
  const [resources, setResources] = useState<resourceDataType[]>([]);
  const [isResourceShown, setIsResourceShown] = useState<boolean>(true);
  const [addResource, setAddResource] = useState<boolean>(false);
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

  return (
    <ResourceContext.Provider
      value={{
        resources,
        setResources,
        isResourceShown,
        setIsResourceShown,
        addResource,
        setAddResource,
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
