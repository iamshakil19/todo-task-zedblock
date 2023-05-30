import React from "react";
import useAuthCheck from "./hooks/useAuthCheck";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/Routes/Routes";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div className="min-h-screen mx-auto container flex justify-center items-center">
      <div>Loading...</div>
    </div>
  ) : (
    <div className="container mx-auto">
      <Toaster />
      <RouterProvider router={routes}></RouterProvider>
    </div>
  );
}

export default App;
