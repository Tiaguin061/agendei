import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { UniqueApartmentPage } from "../pages/UniqueApartment";

export function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomePage />} path="/" />
        <Route element={<UniqueApartmentPage />} path="/apt/:id" />
        <Route element={<LoginPage />} path="/login" />
      </Routes>
    </BrowserRouter>
  );
}
