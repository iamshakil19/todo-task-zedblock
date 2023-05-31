import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layout/Main/MainLayout";
import Tasks from "../../Pages/Tasks/Tasks";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import PrivateRoute from "../../utils/PrivateRoute";
import PublicRoute from "../../utils/PublicRoute";
import AddTask from "../../Pages/AddTask/AddTask";
import TaskDetails from "../../Pages/TaskDetails/TaskDetails";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Tasks />,
      },
      {
        path: "/add-task",
        element: <AddTask />,
      },
      {
        path: "/task-details/:id",
        element: <TaskDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    ),
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

export default routes;
