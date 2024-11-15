/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "@/shared/Loading";
import ErrorPage from "@/shared/ErrorPage";
import { AuthProvider } from "@/contexts/authProvider"; // Importa el AuthProvider aquí
import ProtectedRoute from "@/auth/services/protectedRoute"; // Importa el componente de rutas protegidas

// Layout principal
const Layout = lazy(() => import("@/landing/Layout"));

// Páginas
const Home = lazy(() => import("@/landing/pages/Home"));
const AboutUs = lazy(() => import("@/landing/pages/AboutUs"));
const Help = lazy(() => import("@/landing/pages/Help"));
const Roles = lazy(() => import("@/landing/pages/Roles"));
const Login = lazy(() => import("@/auth/pages/Login"));
const OrganizationSignup = lazy(
  () => import("@/auth/pages/OrganizationSignup")
);
const HeadquartersSignup = lazy(
  () => import("@/auth/pages/HeadquartersSignup")
);
const UserSignup = lazy(() => import("@/auth/pages/UserSignup"));
const VerificationCode = lazy(() => import("@/auth/pages/VerificationCode"));
const OrganizationHome = lazy(() => import("@/organization/pages/Home"));
const OrganizationInfo = lazy(() => import("@/organization/pages/EditInfo"));
const UserHome = lazy(() => import("@/user/pages/Home"));
const UserInfo = lazy(() => import("@/user/pages/EditInfo"));
const Poll = lazy(() => import("@/user/pages/Poll"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Layout />
        </Suspense>
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/aboutUs", element: <AboutUs /> },
      { path: "/help", element: <Help /> },
      { path: "/login", element: <Login /> },
      { path: "/roles", element: <Roles /> },
      { path: "/organizationSignup", element: <OrganizationSignup /> },
      { path: "/headquarterSignup", element: <HeadquartersSignup /> },
      { path: "/userSignup", element: <UserSignup /> },

      // Rutas protegidas de la organización
      {
        path: "/HomeOrganization",
        element: (
          <ProtectedRoute>
            <OrganizationHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/EditOrganizationInfo",
        element: (
          <ProtectedRoute>
            <OrganizationInfo />
          </ProtectedRoute>
        ),
      },

      // Rutas protegidas del usuario
      {
        path: "/Verification",
        element: <VerificationCode />,
      },
      {
        path: "/HomeUser",
        element: (
          <ProtectedRoute>
            <UserHome />
          </ProtectedRoute>
        ),
      },
      {
        path: "/EditUserInfo",
        element: (
          <ProtectedRoute>
            <UserInfo />
          </ProtectedRoute>
        ),
      },
      {
        path: "/Poll",
        element: (
          <ProtectedRoute>
            <Poll />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
