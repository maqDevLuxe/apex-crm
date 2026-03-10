import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { DashboardLayout } from "@/components/DashboardLayout";

import SalesDashboard from "@/pages/SalesDashboard";
import LeadConversion from "@/pages/LeadConversion";
import KanbanBoard from "@/pages/KanbanBoard";
import ContactDirectory from "@/pages/ContactDirectory";
import Timeline from "@/pages/Timeline";
import Notifications from "@/pages/Notifications";
import FAQ from "@/pages/FAQ";
import Profile from "@/pages/Profile";
import SettingsPage from "@/pages/SettingsPage";
import SecurityPage from "@/pages/SecurityPage";
import BillingPage from "@/pages/BillingPage";
import TeamPage from "@/pages/TeamPage";

import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import OTPPage from "@/pages/auth/OTPPage";

import { NotFoundPage, ServerErrorPage, MaintenancePage } from "@/pages/ErrorPages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Auth pages (no sidebar) */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/otp" element={<OTPPage />} />

            {/* Error pages (no sidebar) */}
            <Route path="/500" element={<ServerErrorPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />

            {/* Dashboard pages (with sidebar) */}
            <Route
              path="/*"
              element={
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<SalesDashboard />} />
                    <Route path="/lead-conversion" element={<LeadConversion />} />
                    <Route path="/kanban" element={<KanbanBoard />} />
                    <Route path="/contacts" element={<ContactDirectory />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/team" element={<TeamPage />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/security" element={<SecurityPage />} />
                    <Route path="/billing" element={<BillingPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </DashboardLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
