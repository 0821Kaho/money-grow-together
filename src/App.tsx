
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner, toast } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { RedirectMiddleware } from "./middleware";
import { ThemeProvider } from "next-themes";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ModulePage from "./pages/ModulePage";
import ModulesListPage from "./pages/ModulesListPage";
import AchievementsPage from "./pages/AchievementsPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import ImpactPage from "./pages/ImpactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CompanyPage from "./pages/CompanyPage";
import EnCompanyPage from "./pages/EnCompanyPage";
import OnboardingCarousel from "./components/onboarding/OnboardingCarousel";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import AuthLayout from "./components/layout/AuthLayout";
import AdminLayout from "./components/layout/AdminLayout";
import WaitlistPage from "./pages/admin/WaitlistPage";
import UsersPage from "./pages/admin/UsersPage";
import UserDetailPage from "./pages/admin/UserDetailPage";
import FeedbackPage from "./pages/admin/FeedbackPage";
import DashboardPage from "./pages/admin/DashboardPage";
import AdminSettingsPage from "./pages/admin/SettingsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Footer from "./components/layout/Footer";

// Protected route component - moved inside the app to avoid React hooks outside components
function AppRoutes() {
  const { isAuthenticated, user, isLoading } = useAuth();
  
  // Protected route component with improved logic
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    
    useEffect(() => {
      // Only redirect after auth check is complete and user is not authenticated
      if (!isLoading && !isAuthenticated) {
        // Store the current path to return after login
        localStorage.setItem('returnPath', window.location.pathname);
        navigate("/login");
      }
    }, [isLoading, isAuthenticated, navigate]);
    
    // Show nothing while checking auth status or navigating
    if (isLoading || !isAuthenticated) return null;
    
    // Show children only when authenticated
    return <>{children}</>;
  };

  // Admin route component that checks if user is admin
  const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    
    useEffect(() => {
      if (!isLoading) {
        if (!isAuthenticated) {
          // Store the current path to return after login
          localStorage.setItem('returnPath', window.location.pathname);
          navigate("/login");
        } else {
          // Check admin status directly here as well
          const isAdmin = user?.email === 'kahosatoyoshi@gmail.com' || 
                         user?.email?.endsWith('@admin.com') || 
                         user?.isAdmin === true;
                         
          if (!isAdmin) {
            // User is logged in but not an admin
            toast.error("管理者権限が必要です");
            navigate("/");
          }
        }
      }
    }, [isLoading, isAuthenticated, user, navigate]);
    
    // Check admin status directly to avoid rendering issues
    const isAdmin = user?.email === 'kahosatoyoshi@gmail.com' || 
                   user?.email?.endsWith('@admin.com') || 
                   user?.isAdmin === true;
    
    // Show nothing while checking auth status or navigating
    if (isLoading || !isAuthenticated || !isAdmin) return null;
    
    // Show children only when authenticated and admin
    return <>{children}</>;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
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
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          
          {/* Admin routes - using AdminRoute component */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="users/:id" element={<UserDetailPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="waitlist" element={<WaitlistPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* Only show footer on non-admin routes */}
      {!window.location.pathname.startsWith('/admin') && <Footer />}
    </div>
  );
}

const App = () => {
  // Create QueryClient instance inside the component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <RedirectMiddleware>
                <AppRoutes />
              </RedirectMiddleware>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
