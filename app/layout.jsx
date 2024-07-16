import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "propertyPulse | finf the perfect rental",
  description: "Fnd your Dream rental property",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
      
      <Navbar/>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
