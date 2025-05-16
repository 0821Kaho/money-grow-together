
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

// Middleware component to handle redirects
export const RedirectMiddleware = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Redirect /app/* paths to /coming-soon
    if (location.pathname.startsWith('/app')) {
      navigate('/coming-soon', { replace: true });
    }
  }, [location.pathname, navigate]);
  
  return <>{children}</>;
};
