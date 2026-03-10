"use client";

import { ToastContainer } from "react-toastify";

import BackButtonHandler from "./BackButtonHandler";
import InternetChecker from "./InternetChecker";
import ProtectedRoute from "./protectedRoute";
import BrowserOverlay from "./BrowserOverlay";
import AppInit from "./pushsetup";

export default function ClientProviders({ children }) {
  return (
    <>
      <AppInit />
      <BackButtonHandler />

      <InternetChecker>
        <BrowserOverlay>
          <ProtectedRoute>{children}</ProtectedRoute>
        </BrowserOverlay>
      </InternetChecker>

      <ToastContainer />
    </>
  );
}
