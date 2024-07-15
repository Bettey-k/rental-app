import React from "react";
import "@/assets/styles/globals.css";

export const metadata = {
  title: "propertyPulse | finf the perfect rental",
  description: "Fnd your Dream rental property",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div>{children}</div>
      </body>
    </html>
  );
};

export default MainLayout;
