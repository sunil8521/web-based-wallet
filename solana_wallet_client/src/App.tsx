import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Welcome from "./pages/Welcome";
import ConfirmMnemonic from "./pages/ConfirmMnemonic";
import CreateWallet from "./pages/CreateWallet";
import SetPassword from "./pages/SetPassword";
import Dashboard from "./pages/Dashboard"
import ErrorComponent from "./components/ErrorComponent"
// import {  useState, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {


  const allR = createBrowserRouter([
    { path: "/", element: <Welcome></Welcome>,errorElement:<ErrorComponent/> },
    { path: "/create-wallet", element: <CreateWallet></CreateWallet>,errorElement:<ErrorComponent/> },
    { path: "/set-passwd", element: <SetPassword></SetPassword>,errorElement:<ErrorComponent/> },
    { path: "/dashboard", element: <Dashboard></Dashboard>,errorElement:<ErrorComponent/> },
  ]);

  return (
    <ErrorBoundary>
      <RouterProvider router={allR} />
    </ErrorBoundary>
  );
}

export default App;
