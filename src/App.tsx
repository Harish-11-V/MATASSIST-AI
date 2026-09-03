import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AppSelection from "./pages/AppSelection";
import DataIngestion from "./pages/DataIngestion";
import Processing from "./pages/Processing";
import Analytics from "./pages/Analytics";
import Chat from "./pages/Chat";
import MultiStageMenu from "./pages/MultiStageMenu";
import MaterialResults from "./pages/MaterialResults";
import NotFound from "./pages/NotFound";
import A890Demo from "./pages/A890Demo";
import A182Demo from "./pages/A182Demo";

const queryClient = new QueryClient();

const App = () => {
  // Bypass auth login screen for Demo Mode
  const session = { user: { id: "demo-user" } };
  const loading = false;
  const error = null;

  useEffect(() => {
    // Disabled auth checks for demo
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-lg">Loading...</p>
        <p className="text-sm text-gray-500 mt-2">Connecting to Supabase...</p>
      </div>
    </div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="text-center text-red-600">
        <p className="text-lg font-bold">Error</p>
        <p className="text-sm mt-2">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    </div>;
  }

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={session ? <Index /> : <Navigate to="/auth" replace />} />
          <Route path="/auth" element={session ? <Navigate to="/" replace /> : <Auth />} />
          <Route path="/app-selection" element={session ? <AppSelection /> : <Navigate to="/auth" replace />} />
          <Route path="/data-ingestion" element={session ? <DataIngestion /> : <Navigate to="/auth" replace />} />
          <Route path="/multi-stage-menu" element={session ? <MultiStageMenu /> : <Navigate to="/auth" replace />} />
          <Route path="/material-results" element={session ? <MaterialResults /> : <Navigate to="/auth" replace />} />
          <Route path="/processing" element={session ? <Processing /> : <Navigate to="/auth" replace />} />
          <Route path="/analytics" element={session ? <Analytics /> : <Navigate to="/auth" replace />} />
          <Route path="/chat" element={session ? <Chat /> : <Navigate to="/auth" replace />} />
          <Route path="/a890-demo" element={session ? <A890Demo /> : <Navigate to="/auth" replace />} />
          <Route path="/a182-demo" element={session ? <A182Demo /> : <Navigate to="/auth" replace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
