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
