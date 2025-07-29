import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
// Add your imports here
import HomeDashboard from "./pages/home-dashboard";
import LoginRegistration from "./pages/login-registration";
import CausesBrowse from "./pages/causes-browse";
import EmergencyCases from "./pages/emergency-cases";
import CampaignDetails from "./pages/campaign-details";
import DonorDashboard from "./pages/donor-dashboard";
import About from "./pages/about";
import NotFound from "./pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<HomeDashboard />} />
        <Route path="/home-dashboard" element={<HomeDashboard />} />
        <Route path="/login-registration" element={<LoginRegistration />} />
        <Route path="/causes-browse" element={<CausesBrowse />} />
        <Route path="/emergency-cases" element={<EmergencyCases />} />
        <Route path="/campaign-details" element={<CampaignDetails />} />
        <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;