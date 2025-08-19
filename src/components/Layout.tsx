import React from "react";
import Navbar from "./navbar";
import Footer from "./Footer";


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="container mx-auto mt-4">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
