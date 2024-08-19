import React from "react";
import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { GlobalProvider } from "@/context/GlobalContext";
// '@assets/styles/globals.css';
export const metadata = {
  title: "propertyPulse | find the perfect rental",
  description: "Fnd your Dream rental property",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
    <GlobalProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <ToastContainer autoClose={5000} />
        </body>
      </html>
      </GlobalProvider>
    </AuthProvider>
  );
};

export default MainLayout;
