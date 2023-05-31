import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApi";
import { toast } from "react-hot-toast";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [login, { data, isLoading, isSuccess, error }] = useLoginMutation();
  useEffect(() => {
    if (error) {
      toast.error(error?.data?.error, { id: "login" });
    }
    if (data?.accessToken && data?.user) {
      Navigate("/");
    }
  }, [error, data?.accessToken, data?.user]);

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="container mt-32 mx-auto px-5">
      <h2 className="text-4xl font-bold text-black poppins text-center">
        Login
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-sm mx-auto mt-10 pb-20">
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
            <span className="text-sm block">Email: demo@gmail.com</span>
            {errors.email && (
              <span className="label-text-alt text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <h3 className="poppins text-lg font-semibold mb-2 mt-5 ">
              Password
            </h3>
            <div className="relative">
              <input
                placeholder="Type your password"
                type="password"
                className={`border w-full outline-none py-2 px-3 ${
                  errors.password
                    ? " border-red-500 focus:border-red-500"
                    : "focus:border-slate-700 border-slate-300"
                }`}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
              />
            </div>
            <span className="text-sm block">Password: Demo2@</span>
            {errors.password && (
              <span className="label-text-alt text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <input
            disabled={isLoading}
            className="bg-black text-white mt-5 w-full py-2 text-lg poppins font-semibold cursor-pointer uppercase"
            type="submit"
            value="Login"
          />
          <Link
            to="/register"
            className="mt-7 block poppins cursor-pointer hover:underline"
          >
            Create account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
