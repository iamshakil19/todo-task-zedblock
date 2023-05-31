import React from "react";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const { title, description, completed, _id } = task || {};

  const navigate = useNavigate();

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
      </div>
    </div>
  );
};

export default TaskCard;
