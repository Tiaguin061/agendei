import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { RegisterUserPage } from "../pages/RegisterUser";
import { UniqueApartmentPage } from "../pages/UniqueApartment";

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/home" />
        <Route element={<UniqueApartmentPage />} path="/apt/:id" />

        <Route element={<LoginPage />} path="/" />
        <Route element={<LoginPage />} path="/login" />

        <Route element={<RegisterUserPage />} path="/register" />
      </Routes>
    </BrowserRouter>
  );
}
