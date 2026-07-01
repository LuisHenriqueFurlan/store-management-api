import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import BrandsPage from "../pages/Brands";
import CategoriesPage from "../pages/Categories";
import DashboardPage from "../pages/Dashboard";
import LoginPage from "../pages/Login";
import PaymentsPage from "../pages/Payments";
import ProductsPage from "../pages/Products";
import SalesPage from "../pages/Sales";
import StockPage from "../pages/Stock";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";
import { routePaths } from "./paths";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routePaths.login}
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path={routePaths.dashboard}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={routePaths.products}
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={routePaths.categories}
          element={
            <ProtectedRoute>
              <CategoriesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={routePaths.brands}
          element={
            <ProtectedRoute>
              <BrandsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={routePaths.stock}
          element={
            <ProtectedRoute>
              <StockPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={routePaths.sales}
          element={
            <ProtectedRoute>
              <SalesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={routePaths.payments}
          element={
            <ProtectedRoute>
              <PaymentsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={routePaths.dashboard} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
