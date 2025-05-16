
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ComingSoonPage from "./pages/ComingSoonPage";
import ImpactPage from "./pages/ImpactPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import CompanyPage from "./pages/CompanyPage";
import { AuthProvider } from "./contexts/AuthContext";

// Update API lib for waitlist endpoints
<lov-add-dependency>react-countdown@2.3.5</lov-add-dependency>

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/impact" element={<ImpactPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/about" element={<CompanyPage />} />
      <Route path="/company" element={<Navigate to="/about" replace />} />
      <Route path="/coming-soon" element={<ComingSoonPage />} />
      
      {/* All protected routes now redirect to coming soon */}
      <Route path="/login" element={<Navigate to="/coming-soon" replace />} />
      <Route path="/signup" element={<Navigate to="/coming-soon" replace />} />
      <Route path="/onboarding" element={<Navigate to="/coming-soon" replace />} />
      <Route path="/module/:id" element={<Navigate to="/coming-soon" replace />} />
      <Route path="/modules" element={<Navigate to="/coming-soon" replace />} />
      <Route path="/achievements" element={<Navigate to="/coming-soon" replace />} />
      <Route path="/profile" element={<Navigate to="/coming-soon" replace />} />
      
      {/* 404 route */}
      <Route path="*" element={<NotFound />} />
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
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
