import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEditCompletedMutation } from "../features/task/taskApi";

const TaskCard = ({ task }) => {
  const { title, description, completed, _id } = task || {};
  const [editCompleted, { isSuccess }] = useEditCompletedMutation();
  const navigate = useNavigate();
  const handleCheck = (e) => {
    const data = {
      completed: e.target.checked,
    };
    editCompleted({ id: _id, data });
  };
  return (
    <div className="card rounded-md max-w-sm bg-gradient-to-r from-[#6F99C3] to-[#D8E6F3] shadow-xl">
      <div className="card-body">
        <h2
          onClick={() => navigate(`/task-details/${_id}`)}
          className="card-title capitalize cursor-pointer"
        >
          {title}
        </h2>
        <p className="text-justify">
          {description.length < 100
            ? description
            : description.slice(0, 100) + "..."}
        </p>

        <div className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            id="completed"
            defaultChecked={completed}
            onChange={(e) => handleCheck(e)}
            className="checkbox checkbox-sm"
          />
          <label htmlFor="completed" className="cursor-pointer">
            Completed
          </label>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
