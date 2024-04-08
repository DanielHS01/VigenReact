import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import Loading from "@/shared/Loading";
import ErrorPage from "@/shared/ErrorPage";

const Layout = lazy(() => import("@/landing/Layout"));
const Home = lazy(() => import("@/landing/pages/Home"));
const AboutUs = lazy(() => import("@/landing/pages/AboutUs"));
const Help = lazy(() => import("@/landing/pages/Help"));
const Roles = lazy(() => import("@/landing/pages/Roles"));
const Login = lazy(() => import("@/auth/pages/Login"));
const OrganizationSignup = lazy(
  () => import("@/auth/pages/OrganizationSignup")
);
const UserSignup = lazy(() => import("@/auth/pages/UserSignup"));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: (
          <Suspense fallback={<Loading />}>
            <Home />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/aboutUs",
        element: (
          <Suspense fallback={<Loading />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/help",
        element: (
          <Suspense fallback={<Loading />}>
            <Help />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/login",
        element: (
          <Suspense fallback={<Loading />}>
            <Login />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/roles",
        element: (
          <Suspense fallback={<Loading />}>
            <Roles />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/organizationSignup",
        element: (
          <Suspense fallback={<Loading />}>
            <OrganizationSignup />
          </Suspense>
        ),
      },
      {
        index: true,
        path: "/userSignup",
        element: (
          <Suspense fallback={<Loading />}>
            <UserSignup />
          </Suspense>
        ),
      },
    ],
  },
]);
