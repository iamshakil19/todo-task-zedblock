import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteTaskMutation,
  useGetSingleTaskQuery,
} from "../../features/task/taskApi";
import { toast } from "react-hot-toast";
import { MdOutlineDelete, MdModeEdit } from "react-icons/md";
const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: task, isLoading, isError, error } = useGetSingleTaskQuery(id);
  const { title, description, completed } = task?.data || {};

  const [deleteTask, { isSuccess }] = useDeleteTaskMutation();

  const handleDelete = () => {
    deleteTask(id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully deleted");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  let content = null;

  if (isLoading) {
    content = <div className="text-center mt-10">Loading...</div>;
  } else if (!isLoading && isError) {
    content = <p className="text-white bg-red-400 py-2">There was an error</p>;
  } else if (!isLoading && !isError && task?.data?._id) {
    content = (
      <div className="mt-10 max-w-3xl mx-auto">
        <div>
          <p className="flex items-center justify-end gap-5 mb-5">
            <MdModeEdit
              size={35}
              className="cursor-pointer bg-blue-200 p-1.5 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-200"
            />
            <MdOutlineDelete
              onClick={handleDelete}
              size={35}
              className="cursor-pointer bg-red-200 p-1.5 rounded-full hover:bg-red-500 hover:text-white transition-all duration-200"
            />
          </p>
          <h2 className="mb-5 text-2xl font-semibold ">{title}</h2>

          <p>{description}</p>
        </div>
      </div>
    );
  }
  return content;
};

export default TaskDetails;
