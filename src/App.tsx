
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { RedirectMiddleware } from "./middleware";
import { ThemeProvider } from "next-themes";
import { initStorage } from "./lib/storage";
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
import InvestmentWeek1Page from "./pages/InvestmentWeek1Page";
import StoryPigipeIntro from "./components/story/StoryPigipeIntro";
import DebugPage from "./pages/DebugPage";
import Footer from "./components/layout/Footer";

// Initialize storage on app startup
initStorage();

const AppContent = () => {
  const location = useLocation();
  
  // Check if current route is a learning module
  const isModulePage = location.pathname.startsWith('/module/');
  
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <Routes>
          {/* Public routes - all content now accessible */}
          <Route path="/" element={<Index />} />
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/modules" element={<ModulesListPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/onboarding" element={<OnboardingCarousel />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/about" element={<CompanyPage />} />
          <Route path="/en/about" element={<EnCompanyPage />} />
          <Route path="/company" element={<Navigate to="/about" replace />} />
          
          {/* Story route */}
          <Route path="/story" element={<StoryPigipeIntro onFinish={() => window.location.href = '/module/budget-survival'} />} />
          
          {/* Investment game routes */}
          <Route path="/game/investment/week1" element={<InvestmentWeek1Page />} />
          
          {/* Debug route */}
          <Route path="/debug" element={<DebugPage />} />
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* Conditionally render Footer - hide on module pages */}
      {!isModulePage && <Footer />}
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <RedirectMiddleware>
              <AppContent />
            </RedirectMiddleware>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
