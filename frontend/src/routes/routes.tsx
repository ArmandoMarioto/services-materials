
import { LoginPage } from "@/modules/Login/LoginPage";
import { MaterialsPage } from "@/modules/Materials/MaterialsPage";
import { ServicesPage } from "@/modules/Services/ServicesPage";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";


export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "services",
    element: (
      <PrivateRoutes>
<ServicesPage />
      </PrivateRoutes>
      
    ),
  },
  {
    path: "services/:id/materials",
    element:(      <PrivateRoutes>
      <MaterialsPage />
            </PrivateRoutes>)
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

