"use client";

import { ToastContainer } from "react-toastify";

import BackButtonHandler from "./BackButtonHandler";
import InternetChecker from "./InternetChecker";
import ProtectedRoute from "./protectedRoute";
import BrowserOverlay from "./BrowserOverlay";
import AppInit from "./pushsetup";
import { SessionProvider } from "next-auth/react";
import BannedCheckRoute from "./BannedCheck";

export default function ClientProviders({ children }) {
  return (
    <>
      <AppInit />
      <BackButtonHandler />

      <InternetChecker>
        <BrowserOverlay>
          <SessionProvider>
            <ProtectedRoute>{children}</ProtectedRoute>
          </SessionProvider>
        </BrowserOverlay>
      </InternetChecker>

      <ToastContainer />
    </>
  );
}
