import { ArrowRight, Sparkles, Zap, Database, Shield, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
      </div>

      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-6 animate-slide-up">
            <Bot className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">MatBOT AI • RAG + Gemini Powered</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-foreground animate-slide-up" style={{ animationDelay: "0.1s" }}>
            GenAI-Powered{" "}
            <span className="text-primary">Material</span>{" "}
            Assistance
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            Intelligent material selection for Cryogenic, Subsea, and Oil & Gas applications. 
            Upload standards, extract properties, and get AI-powered recommendations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              onClick={() => navigate("/app-selection")}
            >
              Start Material Selection
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8"
              onClick={() => navigate("/chat")}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Ask AI Assistant
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-slide-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Database, value: "10,000+", label: "Materials" },
              { icon: Shield, value: "ASTM, DIN, EN, ISO", label: "Standards" },
              { icon: Zap, value: "20-30%", label: "Cost Reduction" },
              { icon: Sparkles, value: "Gemini AI", label: "RAG Powered" },
            ].map((stat, index) => (
              <div key={index} className="bg-card rounded-xl p-4 border border-border shadow-card hover:shadow-elevated transition-shadow">
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <stat.icon className="h-5 w-5 text-primary mb-2" />
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}