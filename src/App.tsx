
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { RedirectMiddleware } from "./middleware";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ModulePage from "./pages/ModulePage";
import ModulesListPage from "./pages/ModulesListPage";
import AchievementsPage from "./pages/AchievementsPage";
import ProfilePage from "./pages/ProfilePage";
import ImpactPage from "./pages/ImpactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CompanyPage from "./pages/CompanyPage";
import EnCompanyPage from "./pages/EnCompanyPage";
import OnboardingCarousel from "./components/onboarding/OnboardingCarousel";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AuthLayout from "./components/layout/AuthLayout";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Footer from "./components/layout/Footer";
import AdminWaitlistPage from "./pages/admin/AdminWaitlistPage";

// Protected route component - moved inside the app to avoid React hooks outside components
function AppRoutes() {
  const { isAuthenticated, user } = useAuth();
  
  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
  };

  // Admin route component
  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    // Simple admin check - in production use a proper role system
    const isAdmin = user?.email === "admin@pigipe.com";
    
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    if (!isAdmin) {
      return <Navigate to="/" replace />;
    }
    
    return <>{children}</>;
  };

  return (
    <Routes>
      {/* Admin routes with no header/footer */}
      <Route path="/admin/waitlist" element={
        <AdminRoute>
          <div className="min-h-screen">
            <AdminWaitlistPage />
          </div>
        </AdminRoute>
      } />
      
      {/* All other routes with standard layout */}
      <Route path="/" element={
        <div className="flex flex-col min-h-screen">
          <div className="flex-grow">
            <Routes>
              {/* Public routes */}
              <Route index element={<Index />} />
              <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
              <Route path="/signup" element={<AuthLayout><SignupPage /></AuthLayout>} />
              <Route path="/impact" element={<ImpactPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/about" element={<CompanyPage />} />
              <Route path="/en/about" element={<EnCompanyPage />} />
              <Route path="/company" element={<Navigate to="/about" replace />} />
              
              {/* Protected routes */}
              <Route path="/onboarding" element={<ProtectedRoute><OnboardingCarousel /></ProtectedRoute>} />
              <Route path="/module/:id" element={<ProtectedRoute><ModulePage /></ProtectedRoute>} />
              <Route path="/modules" element={<ProtectedRoute><ModulesListPage /></ProtectedRoute>} />
              <Route path="/achievements" element={<ProtectedRoute><AchievementsPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </div>
      } />
    </Routes>
  );
}

const App = () => {
  // Create QueryClient instance inside the component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RedirectMiddleware>
              <AppRoutes />
            </RedirectMiddleware>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
