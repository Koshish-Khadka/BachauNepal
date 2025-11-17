"use client";
import { useRouter } from "next/navigation";
import volunteer from "../../../../public/volunteer.jpg";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
import { registerUser } from "@/actions/auth";

const Signup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    try {
      const { username, email, password, role } = data;
      const result = await registerUser({
        name: username,
        email,
        password,
        role,
      });
      if (result.status === "success") {
        alert(
          "Registration successful! Please check your email to verify your account."
        );
      } else {
        // alert("Registration failed. Please try again.");
        alert(result.message);
        console.error("Registration error:", result.message);
      }
    } catch (error) {
      console.log("", error);
    }
  };

  return (
    <div className="flex h-screen w-full ">
      {/* SignUp form on left */}
      <div className="w-1/3 h-screen flex items-center justify-center ">
        {/* <div className=" flex flex-col justify-center items-center "> */}
        <div className="bg-white  max-w-md">
          <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
          <p className="text-center text-sm mb-6 text-gray-500">
            Enter your credentials to access your account
          </p>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                UserName
              </label>
              <input
                type="name"
                id="name"
                {...register("username", { required: "Username is required" })}
                required
                className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="enter your username"
              />
              {errors.username && (
                <p className="text-red-600 text-sm">
                  {errors.username.message as string}
                </p>
              )}
            </div>
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
                required
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
                {...register("password", { required: "Password is required" })}
                required
                className="mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="enter your password"
              />
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            <div className="my-8 ">
              <RadioGroup
                {...register("role", { required: true })}
                onValueChange={(value) => {
                  // react-hook-form doesn't auto update for custom components
                  setValue("role", value);
                }}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="volunteer" id="volunteer" />
                  <Label htmlFor="volunteer" className="text-base font-bold">
                    Volunteer
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin" className="text-base font-bold">
                    Admin
                  </Label>
                </div>
              </RadioGroup>

              {errors.role && (
                <p className="text-red-600 text-sm">Role is required</p>
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
            <span className="flex gap-2">
              Already registered ?{" "}
              <p
                className="text-base text-blue-600 cursor-pointer"
                onClick={() => router.push("/auth/login")}
              >
                Sign In
              </p>
            </span>
          </div>
        </div>
        {/* </div> */}
      </div>
      {/* Image on right */}
      <div>
        <Image
          src={volunteer}
          alt="Signup Image"
          className="object-cover h-screen w-full"
          priority
        />
      </div>
    </div>
  );
};

export default Signup;
