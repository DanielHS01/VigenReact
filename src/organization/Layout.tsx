import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "@/landing/components/Header/Header";
import Footer from "@/landing/components/Footer/Footer";

const Layout = () => {
  return (
    <div className="bg-cyan-50 dark:bg-cyan-950">
      <Header />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
