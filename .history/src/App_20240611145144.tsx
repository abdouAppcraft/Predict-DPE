import React from "react";
import PredictForm from "./screens/PredictForm/PredictForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Result from "./screens/Result/Result";

const router = createBrowserRouter([
  {
    path: "/",
    Component: PredictForm,
  },
  {
    path: "/result",
    Component: Result,
  },
]);

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
