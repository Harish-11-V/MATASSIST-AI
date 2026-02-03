import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { ChatInterface } from "@/components/dashboard/ChatInterface";
import { MaterialsGrid } from "@/components/dashboard/MaterialsGrid";
import { FeaturesSection } from "@/components/dashboard/FeaturesSection";
import { StandardsBanner } from "@/components/dashboard/StandardsBanner";
import { QuickAccessSection } from "@/components/dashboard/QuickAccessSection";
import { ExploreStandardsSection } from "@/components/dashboard/ExploreStandardsSection";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <StandardsBanner />
        <QuickAccessSection />
        <ExploreStandardsSection />
        <ChatInterface />
        <MaterialsGrid />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
