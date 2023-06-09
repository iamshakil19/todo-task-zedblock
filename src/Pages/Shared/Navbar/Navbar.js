import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLoggedOut } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCompleted,
  handleTaskSearch,
} from "../../../features/task/taskSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(userLoggedOut());
    localStorage.removeItem("auth");
  };
  const navigate = useNavigate();
  const { searchText, completed } = useSelector((state) => state.task);

  const handleSearch = (e) => {
    dispatch(handleTaskSearch(e.target.value));
    navigate("/");
  };

  return (
    <div className="navbar bg-gradient-to-r from-[#0202ba] to-[#00d4ff] text-white">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 text-black"
          >
            <li onClick={() => dispatch(handleCompleted(null))}>All</li>
            <li onClick={() => dispatch(handleCompleted(false))}>Active</li>
            <li onClick={() => dispatch(handleCompleted(true))}>Completed</li>
          </ul>
        </div>
        <Link to="/" className="font-bold ml-2 normal-case text-xl">
          Zedblock
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li
            className={`mx-2 cursor-pointer font-semibold ${completed === null && "text-orange-400"}`}
            onClick={() => dispatch(handleCompleted(null))}
          >
            All
          </li>
          <li
            className={`mx-2 cursor-pointer font-semibold ${completed === false && "text-orange-400"}`}
            onClick={() => dispatch(handleCompleted(false))}
          >
            Active
          </li>
          <li
            className={`mx-2 cursor-pointer font-semibold ${completed === true && "text-orange-400"}`}
            onClick={() => dispatch(handleCompleted(true))}
          >
            Completed
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="form-control">
          <input
            defaultValue={searchText}
            onChange={(e) => handleSearch(e)}
            type="text"
            placeholder="Search"
            className="input input-info focus:outline-none text-black"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar ml-3">
            <div className="w-10 rounded-full">
              <img
                src="https://images.unsplash.com/photo-1474176857210-7287d38d27c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow-lg menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li className="text-black">
              <Link to="add-task">Add Task</Link>
            </li>
            <li>
              <button onClick={logout} className="text-black">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
