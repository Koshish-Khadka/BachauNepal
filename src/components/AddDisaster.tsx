"use client";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useDisaster } from "@/context/disasterContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";
import L from "leaflet";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
type FormValues = {
  title: string;
  type: string;
  startdate: string;
  enddate: string;
  location: string;
  status: string;
  description: string;
  radius: string;
  lat: number;
  lng: number;
  image: FileList | null;
};

const AddDisaster = () => {
  const { setAddDisaster } = useDisaster();
  const [preview, setPreview] = useState<string | null>(null);
  const [lat, setLat] = useState(27.7172);
  const [lng, setLng] = useState(85.324);

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
    try {
      const supabase = await createClient();
      let imageUrl: string | null = null;

      //  Insert disaster data WITHOUT image first
      const { data: insertedDisasters, error: insertError } = await supabase
        .from("disasters")
        .insert({
          title: data.title,
          type: data.type,
          startdate: data.startdate,
          enddate: data.enddate,
          location: data.location,
          status: data.status,
          description: data.description,
          radius: data.radius,
          lat: data.lat,
          lng: data.lng,
        })
        .select();

      if (insertError || !insertedDisasters || insertedDisasters.length === 0) {
        console.error("Failed to insert disaster:", insertError?.message);
        toast.error("Failed to add disaster");
        return; // STOP here: no image uploaded
      }

      const disasterId = insertedDisasters[0].id;

      // Upload image AFTER successful insert
      if (data.image && data.image.length > 0) {
        const file = data.image[0];
        const fileName = `disaster_${Date.now()}_${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("Disaster-Image")
          .upload(fileName, file);

        if (uploadError) {
          console.error("Image upload failed:", uploadError.message);
          toast.warning("Disaster added but image upload failed");
        } else {
          const { data: publicData } = supabase.storage
            .from("Disaster-Image")
            .getPublicUrl(fileName);

          imageUrl = publicData.publicUrl;

          //  Update disaster row with image URL
          const { error: updateError } = await supabase
            .from("disasters")
            .update({ image: imageUrl })
            .eq("id", disasterId);

          if (updateError) {
            console.error(
              "Failed to update disaster with image URL:",
              updateError.message
            );
            toast.warning("Disaster added but could not save image URL");
          }
        }
      }

      toast.success("Disaster added successfully");
      setAddDisaster(false);
      console.log("Disaster saved:", insertedDisasters, "Image URL:", imageUrl);
    } catch (err) {
      console.error("Failed to add disaster:", err);
      toast.error("Something went wrong");
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
    setValue("image", e.target.files); // register file in react-hook-form
  };

  const flagIcon = L.icon({
    iconUrl: "/images/flag.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
  });

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm overflow-y-auto z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative mx-auto my-10">
        <Button
          variant="ghost"
          className="absolute top-3 right-3"
          onClick={() => setAddDisaster(false)}
        >
          <X />
        </Button>

        <h2 className="text-xl font-semibold mb-4">Add Disaster</h2>

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
                  <option value="">Select disaster type</option>
                  <option value="earthquake">Earthquake</option>
                  <option value="flood">Flood</option>
                  <option value="landslide">Landslide</option>
                  <option value="fire">Fire</option>
                  <option value="storm">Storm</option>
                  <option value="drought">Drought</option>
                </select>
              )}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="startdate">Start Date</Label>
            <Input
              id="startdate"
              type="date"
              {...register("startdate", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="enddate">End Date</Label>
            <Input id="enddate" type="date" {...register("enddate")} />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="Location"
              {...register("location", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="status">Status</Label>
            <Controller
              control={control}
              name="status"
              rules={{ required: true }}
              render={({ field }) => (
                <select
                  {...field}
                  className="border rounded-md h-10 px-3 text-sm"
                >
                  <option value="">Select status</option>
                  <option value="active">Active</option>
                  <option value="critical">Critical</option>
                  <option value="undercontrol">Under Control</option>
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

          <div className="flex flex-col gap-1">
            <Label htmlFor="radius">Radius</Label>
            <Input
              id="radius"
              placeholder="Radius"
              {...register("radius", { required: true })}
            />
          </div>

          <div className="flex flex-col gap-2 col-span-2">
            <Label htmlFor="image">Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={150}
                height={150}
                className="rounded-lg border mt-2"
              />
            )}
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
            Submit
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

export default AddDisaster;
