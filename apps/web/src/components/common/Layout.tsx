import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen container mx-auto px-4 flex flex-col">
      <Header />
      <div className="flex-1 my-16">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
