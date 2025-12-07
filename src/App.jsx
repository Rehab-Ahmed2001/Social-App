import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routing/AppRoute";
import AuthContextProvider from "./Context/AuthContext";

function App() {


  return (
    <AuthContextProvider>

      <RouterProvider router={router} />

    </AuthContextProvider>
  );
}

export default App;
