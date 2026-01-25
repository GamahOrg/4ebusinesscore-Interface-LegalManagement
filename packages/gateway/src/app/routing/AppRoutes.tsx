import { FC, useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import ErrorsPage from "../modules/errors/ErrorsPage";
import { PrivateRoutes } from "./PrivateRoutes";
import { MasterLayout } from "../layout/MasterLayout";
import { App } from "../App";
import Logout from "../modules/auth/Logout";
import AuthPage from "../modules/auth/AuthPage";

const { PUBLIC_URL } = (window as any)._env_;
const isDev = (window as any)._env_?.NODE_ENV !== "production";

const AppRoutes: FC = () => {
  const [LoggedUser, setLoggedUser] = useState<null | boolean>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    setLoggedUser(
      user !== null &&
        user !== "" &&
        token !== null &&
        token !== "" &&
        token !== "null"
    );
  }, []);

  useEffect(() => {
    if (LoggedUser === false) {
      const currentPath = window.location.pathname;
      const isSessionHandling = localStorage.getItem(
        "session_handling_in_progress"
      );

      if (
        !currentPath.includes("/auth/login") &&
        !currentPath.includes("/logout") &&
        !isSessionHandling
      ) {
        if (isDev) {
          window.location.href = "/legalmanagement/auth/login";
        } else {
          window.location.href =
            (window as any)._env_?.REACT_APP_Base_Url ?? "/";
        }
      }
    }
  }, [LoggedUser]);

  // Show loading state while determining user authentication status
  if (LoggedUser === null) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "16px",
        }}
      >
        Loading...
      </div>
    );
  }

  const currentToken = localStorage.getItem("token");
  const hasValidToken =
    currentToken && currentToken !== "" && currentToken !== "null";

  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<ErrorsPage />} />
          <Route path="logout" element={<Logout />} />
          <Route element={<MasterLayout />} />

          {hasValidToken ? (
            <Route path="/*" element={<PrivateRoutes />} />
          ) : (
            isDev && (
              <>
                <Route path="auth/*" element={<AuthPage />} />
                <Route path="*" element={<Navigate to="/auth" />} />
              </>
            )
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export { AppRoutes };
