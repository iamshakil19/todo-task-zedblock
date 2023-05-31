import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditTaskMutation,
  useGetSingleTaskQuery,
} from "../../features/task/taskApi";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: task, isLoading, isError, error } = useGetSingleTaskQuery(id);
  const [editTask, { isSuccess }] = useEditTaskMutation();

  const { title, description, completed } = task?.data || {};

  const onSubmit = (data) => {
    editTask({ id, data });
  };

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success("Task Updated", { id: "task" });
      navigate(`/task-details/${id}`);
    }
  }, [id, isSuccess, navigate, reset]);

  let content = null;

  if (isLoading) {
    content = <div className="text-center mt-10">Loading...</div>;
  } else if (!isLoading && isError) {
    content = <p className="text-white bg-red-400 py-2">There was an error</p>;
  } else if (!isLoading && !isError && task?.data?._id) {
    content = (
      <div className="min-h-screen">
        <div className="mx-auto pt-16 ">
          <h2 className="text-xl font-semibold text-center font-serif">
            Edit Task
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="max-w-sm mx-auto mt-5 pb-20">
              <div>
                <h3 className="poppins text-lg font-semibold mb-2">Title</h3>
                <input
                  defaultValue={title}
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
                  defaultValue={description}
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
                      value: 120,
                      message: "Maximum 120 characters",
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
                value="Update"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }

  return content;
};

export default EditTask;
