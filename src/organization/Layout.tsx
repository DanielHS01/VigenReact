import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@/landing/components/Header/Header";
import Footer from "@/landing/components/Footer/Footer";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = () => {
  return (
    <div className="bg-cyan-50 dark:bg-cyan-950">
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
