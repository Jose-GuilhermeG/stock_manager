import { Navigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth"
import type { JSX } from "react";

import Loading from "@/features/Loading";

type ProtectedRouteProps = {
  children: JSX.Element;
};

export function AuthenticateVerify({ children }: ProtectedRouteProps) {
  const {isAuthenticate , isLoading} = useAuth();

  if (!isAuthenticate && !isLoading ) {
    return <Navigate to="/account/login" replace />;
  }

  if (isLoading) return <Loading/>

  return children;
}
