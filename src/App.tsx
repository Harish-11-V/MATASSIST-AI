import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  // Demo mode — always treat user as logged in
  const session = { user: { id: "demo-user" } };

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
