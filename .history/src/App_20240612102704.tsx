import React from "react";
import PredictForm from "./screens/PredictForm/PredictForm";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ResultDPE from "./screens/Result/Result";

const router = createBrowserRouter([
  {
    path: "/",
    Component: PredictForm,
  },
  {
    path: "/result",
    Component: ResultDPE,
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
