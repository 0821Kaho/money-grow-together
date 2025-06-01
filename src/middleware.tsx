
import { ReactNode } from "react";

interface RedirectMiddlewareProps {
  children: ReactNode;
}

export const RedirectMiddleware = ({ children }: RedirectMiddlewareProps) => {
  // Simple pass-through middleware for static site
  return <>{children}</>;
};
