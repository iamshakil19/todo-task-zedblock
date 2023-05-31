import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useRegistrationMutation } from "../../features/auth/authApi";
import { toast } from "react-hot-toast";
const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    watch,
    control,
  } = useForm();

  const [registration, { data, isLoading, error }] = useRegistrationMutation();
console.log(error, 18);
  useEffect(() => {
    if (error?.data?.error?.keyPattern?.email === 1) {
      toast.error("Email is already in use", { id: "registration" });
    }
    if (data?.accessToken && data?.user) {
      Navigate("/");
    }
  }, [data?.accessToken, data?.user, error?.data?.error?.keyPattern?.email]);

  const onSubmit = (data) => {
    registration(data);
  };

  return (
    <div className="container mx-auto pt-32 px-5">
      <h2 className="text-4xl font-bold text-black poppins text-center">
        Register
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm mx-auto mt-5 pb-20">
          <div>
            <h3 className="poppins text-lg font-semibold mb-2">Name</h3>
            <input
              placeholder="Type your name"
              type="text"
              className={`border w-full outline-none  py-2 px-3 ${
                errors.name
                  ? " border-red-500 focus:border-red-500"
                  : "focus:border-slate-700 border-slate-300"
              }`}
              {...register("name", {
                required: {
                  value: true,
                  message: "Name is required",
                },
              })}
            />
            {errors.name && (
              <span className="label-text-alt text-red-500 text-sm py-0">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <h3 className="poppins text-lg font-semibold mb-2 mt-2">Email</h3>
            <input
              placeholder="Type your email"
              type="email"
              className={`border w-full outline-none py-2 px-3 ${
                errors.email
                  ? " border-red-500 focus:border-red-500"
                  : "focus:border-slate-700 border-slate-300"
              }`}
              {...register("email", {
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Provide a valid email",
                },
              })}
            />
            {errors.email && (
              <span className="label-text-alt text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <h3 className="poppins text-lg font-semibold mb-2 mt-2 ">
              Password
            </h3>
            <div className="relative">
              <input
                placeholder="Type your password"
                type="password"
                className={`border w-full outline-none py-2 px-3  ${
                  errors.password
                    ? " border-red-500 focus:border-red-500"
                    : "focus:border-slate-700 border-slate-300"
                }`}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  pattern: {
                    value:
                      /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{6,15}$/,
                    message:
                      "Password must be between 6 to 15 characters and contain at least 1 uppercase, 1 lowercase, 1 digit, 1 symbol",
                  },
                })}
              />
            </div>

            {errors.password && (
              <span className="label-text-alt text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <input
            disabled={isLoading}
            className="bg-black text-white mt-7 w-full py-2 text-lg poppins font-semibold cursor-pointer uppercase disabled:bg-gray-300 disabled:cursor-not-allowed"
            type="submit"
            value="Sign up"
          />
          <Link
            to="/login"
            className="mt-7 block poppins cursor-pointer hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
