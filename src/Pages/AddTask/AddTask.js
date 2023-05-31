import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useCreateTaskMutation } from "../../features/task/taskApi";
import { toast } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AddTask = () => {
  const { user } = useSelector((state) => state.auth) || {};

  const { email } = user || {};
  console.log(email);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    getValues,
    watch,
    control,
  } = useForm();
  const navigate = useNavigate();

  const [createTask, { data, isSuccess, isError, isLoading, error }] =
    useCreateTaskMutation();

  const onSubmit = (data) => {
    const finalData = { ...data, email };
    createTask(finalData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Task created successfully", { id: "task" });
      reset();
      navigate("/");
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="mx-auto pt-16 ">
        <h2 className="text-xl font-semibold text-center font-serif">
          Add Task
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-w-sm mx-auto mt-5 pb-20">
            <div>
              <h3 className="poppins text-lg font-semibold mb-2">Title</h3>
              <input
                placeholder="Type task title"
                type="text"
                className={`border w-full outline-none  py-2 px-3 ${
                  errors.title
                    ? " border-red-500 focus:border-red-500"
                    : "focus:border-slate-700 border-slate-300"
                }`}
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is required",
                  },
                  maxLength: {
                    value: 50,
                    message: "Maximum 50 characters",
                  },
                })}
              />
              {errors.title && (
                <span className="label-text-alt text-red-500 text-sm py-0">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div>
              <h3 className="poppins text-lg font-semibold mb-2 mt-2">
                Description
              </h3>
              <textarea
                rows={6}
                placeholder="Type task description"
                type="text"
                className={`border w-full outline-none py-2 px-3 ${
                  errors.description
                    ? " border-red-500 focus:border-red-500"
                    : "focus:border-slate-700 border-slate-300"
                }`}
                {...register("description", {
                  required: {
                    value: true,
                    message: "Description is required",
                  },
                  maxLength: {
                    value: 250,
                    message: "Maximum 250 characters",
                  },
                })}
              />
              {errors.description && (
                <span className="label-text-alt text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
            <input
              disabled={isLoading}
              className="bg-black text-white mt-7 w-full py-2 text-lg poppins font-semibold cursor-pointer uppercase disabled:bg-gray-300 disabled:cursor-not-allowed"
              type="submit"
              value="Submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
