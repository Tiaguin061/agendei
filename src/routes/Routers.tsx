import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { ListAptsAgendersPage } from "../pages/ListAptsAgenders";
import { LoginPage } from "../pages/Login";
import { RegisterUserPage } from "../pages/RegisterUser";
import { UniqueApartmentPage } from "../pages/UniqueApartment";

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/home" />
        <Route element={<HomePage />} path="/" />
        <Route element={<UniqueApartmentPage />} path="/apt/:id" />
        <Route element={<ListAptsAgendersPage />} path="/apts-agenders" />

        <Route element={<LoginPage />} path="/login" />

        <Route element={<RegisterUserPage />} path="/register" />

        <Route element={<Navigate to="/home" />} path="*" />
      </Routes>
    </BrowserRouter>
  );
}
