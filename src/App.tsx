import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useVisitTracker } from "@/lib/useVisitTracker";

const LensPage = lazy(() => import("./pages/LensPage.tsx"));
const AdminAuth = lazy(() => import("./pages/AdminAuth.tsx"));
const AdminAnalytics = lazy(() => import("./pages/AdminAnalytics.tsx"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe.tsx"));

const queryClient = new QueryClient();

const Tracker = () => {
  const { pathname } = useLocation();
  useVisitTracker();
  // Don't render anything; just mount the hook. Skip tracking on admin pages.
  if (pathname.startsWith("/admin")) return null;
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Tracker />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lens" element={<LensPage />} />
            <Route path="/admin/login" element={<AdminAuth />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
