/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import world from "../../../../public/world.jpg";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginUser } from "@/actions/auth";
import { useUser } from "@/context/userContext";
import { toast } from "sonner";

const Signin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { fetchUserData } = useUser();

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    const result = await LoginUser({ email, password });
    if (result?.status === "success") {
      // Fetch full user data from your "users" table
      await fetchUserData();
      router.push("/");

      toast.success("Login Successfull");
    } else {
      alert(result?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Background image */}
      <Image src={world} alt="Logo" fill className="object-cover" priority />

      {/* Top Text */}
      <div className="absolute top-16 text-white flex flex-col items-center w-full z-20">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="text-sm mt-2">Please sign in to your account</p>
      </div>

      {/* Form */}
      <div className="absolute inset-0 flex flex-col justify-center items-center z-20">
        <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-center">Sign in</h2>
          <p className="text-center text-sm mb-6 text-gray-500">
            Enter your credentials to access your account
          </p>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="enter your email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">
                  {errors.email.message as string}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "password is required" })}
                className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="enter your password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message as string}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          </form>
          <div className="flex flex-col items-center mt-6 space-y-3">
            <p
              className="text-base text-blue-600 cursor-pointer"
              onClick={() => router.push("/auth/signup")}
            >
              Sign up
            </p>
            <p className="text-base text-blue-600">Forgot your password?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
