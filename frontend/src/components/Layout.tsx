// Layout.tsx

import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Add your header here */}

      <Navbar />
      {/* Main content */}
      <main className=" flex-grow">
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </main>

      {/* Add your footer here */}
      <footer className="h-10 bg-blue-500">
        <p>&copy; 2023 Shwe Thitsar</p>
      </footer>
    </div>
  );
};

export default Layout;
