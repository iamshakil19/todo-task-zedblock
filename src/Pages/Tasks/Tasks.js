import React from "react";
import { useGetMyTaskQuery } from "../../features/task/taskApi";
import { useSelector } from "react-redux";
import TaskCard from "../../Components/TaskCard";

const Tasks = () => {
  const { user } = useSelector((state) => state.auth);
  const { email } = user || {};
  const {
    data: taskData,
    isError,
    isLoading,
    error,
  } = useGetMyTaskQuery(email);

  const tasks = taskData?.data || [];

  let content = null;

  if (isLoading) {
    content = <div className="text-center mt-10">Loading...</div>;
  } else if (!isLoading && isError) {
    content = <p className="text-white bg-red-400 py-2 mt-10">There was an error</p>;
  } else if (!isLoading && !isError && tasks?.length === 0) {
    content = (
      <p className="text-center mt-10 font-semibold font-serif">
        You have not created any tasks
      </p>
    );
  } else if (!isLoading && !isError && tasks?.length > 0) {
    content = (
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {tasks?.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    );
  }
  return content;
};

export default Tasks;
