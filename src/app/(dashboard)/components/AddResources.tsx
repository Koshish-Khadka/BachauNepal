"use client";
import { Button } from "../../../components/ui/button";
import { X } from "lucide-react";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import { useResource } from "@/context/resourcesContext";
import { createClient } from "@/utils/supabase/client";
import { TailSpin } from "react-loader-spinner";
type FormValues = {
  title: string;
  type: string;
  description: string;
  lat: number;
  lng: number;
  contactnum: string;
  capacity: number;
};

const AddResource = () => {
  const { setAddResource } = useResource();
  const [lat, setLat] = useState(27.7172);
  const [lng, setLng] = useState(85.324);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { lat, lng },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const supabase = await createClient();
      const { error } = await supabase
        .from("resources")
        .insert({
          title: data.title,
          type: data.type,
          description: data.description,
          lat: data.lat,
          lng: data.lng,
          contactnum: data.contactnum,
          capacity: data.capacity,
        })
        .select();
      if (error) {
        toast.error("Failed to Add Resources");
        console.error(error);
        return;
      }
      toast.success("Resource Added Sucessfully");
      setAddResource(false);
    } catch (err) {
      console.error("Failed to add resources:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);
        setValue("lat", e.latlng.lat);
        setValue("lng", e.latlng.lng);
      },
    });
    return null;
  };

  const flagIcon = L.icon({
    iconUrl: "/images/flag2.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative mx-auto my-10">
        <Button
          variant="ghost"
          className="absolute top-3 right-3"
          onClick={() => setAddResource(false)}
        >
          <X />
        </Button>

        <h2 className="text-xl font-semibold mb-4">Add Resources</h2>

        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Name</Label>
            <Input
              id="title"
              placeholder="Enter name"
              {...register("title", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="type">Type</Label>
            <Controller
              control={control}
              name="type"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  {...field}
                  className="border rounded-md h-10 px-3 text-sm"
                >
                  <option value="">Select resource type</option>
                  <option value="shelter">Shelter</option>
                  <option value="food">Food</option>
                  <option value="water">Water</option>
                  <option value="fuel">Fuel</option>
                  <option value="hospital">Hospital</option>
                  <option value="police station">Police Station</option>
                </select>
              )}
            />
          </div>

          <div className="flex flex-col gap-1 col-span-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Description"
              className="h-16"
              {...register("description", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1 ">
            <Label htmlFor="description">Capacity</Label>
            <Input
              id="capacity"
              placeholder="Capacity"
              {...register("capacity", { required: true })}
            />
          </div>
          <div className="flex flex-col gap-1 ">
            <Label htmlFor="description">Contactnum</Label>
            <Input
              id="contactnum"
              placeholder="Contactnum"
              type="number"
              {...register("contactnum", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="lat">Lat</Label>
            <Input
              id="lat"
              type="number"
              value={lat}
              {...register("lat", { required: true })}
              onChange={(e) => {
                setLat(Number(e.target.value));
                setValue("lat", Number(e.target.value));
              }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="lng">Lng</Label>
            <Input
              id="lng"
              type="number"
              value={lng}
              {...register("lng", { required: true })}
              onChange={(e) => {
                setLng(Number(e.target.value));
                setValue("lng", Number(e.target.value));
              }}
            />
          </div>

          <Button type="submit" className="col-span-2 mt-4 w-full">
            {loading ? (
              <TailSpin
                visible={true}
                color="white"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Submit"
            )}
          </Button>
        </form>

        <div className="mt-6 w-full h-56 rounded-md overflow-hidden">
          <MapContainer
            center={[lat, lng]}
            zoom={8}
            className="w-full h-full"
            zoomControl={false}
          >
            <TileLayer
              attribution='Imagery &copy; <a href="https://www.amantech.com.np/">Amantech</a>'
              url="https://api.mapbox.com/styles/v1/default0015/cmbrpdtii00ze01sd5qgqe1dj/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZGVmYXVsdDAwMTUiLCJhIjoiY2syZXg5dXp6MDY5cTNjcGFxaG00eXZ0OCJ9.SxcmP6OzJZ2bbjttSM6moA"
            />
            <MapClickHandler />
            <Marker position={[lat, lng]} icon={flagIcon} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default AddResource;
