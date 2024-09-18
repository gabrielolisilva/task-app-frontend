import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import RoutesApp from "./RoutesApp.tsx";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <RoutesApp />
      <ToastContainer />
    </UserProvider>
  </StrictMode>
);
