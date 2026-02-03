import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Snowflake, Waves, Fuel, ArrowRight, CheckCircle, Loader2, Sparkles } from "lucide-react";
import { fetchMaterialSuggestions, type MaterialSuggestion } from "@/services/materialSuggestions";
import { useToast } from "@/hooks/use-toast";

interface ApplicationOption {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
  materials: string[];
}

const applications: ApplicationOption[] = [
  {
    id: "cryogenic",
    title: "Cryogenic Applications",
    icon: <Snowflake className="h-8 w-8" />,
    description: "Material selection for extreme low-temperature environments (-196°C to -269°C). Critical for LNG storage, aerospace, and medical applications.",
    features: [
      "Low-temperature impact resistance",
      "Thermal contraction management",
      "Brittle fracture prevention",
      "Cryogenic fatigue analysis"
    ],
    materials: ["Austenitic Stainless Steel (304L, 316L)", "9% Nickel Steel", "Aluminum Alloys (5083, 6061)", "Invar 36"]
  },
  {
    id: "subsea",
    title: "Subsea Applications",
    icon: <Waves className="h-8 w-8" />,
    description: "Materials for underwater equipment and pipelines. Addresses high-pressure, corrosive seawater environments at depths up to 3000m.",
    features: [
      "Seawater corrosion resistance",
      "High-pressure tolerance",
      "Cathodic protection compatibility",
      "Biofouling resistance"
    ],
    materials: ["Duplex Stainless Steel (2205, 2507)", "Super Duplex (25Cr)", "Inconel 625", "Titanium Grade 5"]
  },
  {
    id: "oil-gas",
    title: "Oil & Gas Applications",
    icon: <Fuel className="h-8 w-8" />,
    description: "Material solutions for upstream, midstream, and downstream operations. Handles H2S, CO2, and high-temperature service conditions.",
    features: [
      "Sour service resistance (NACE MR0175)",
      "High-temperature strength",
      "Erosion-corrosion resistance",
      "Weldability requirements"
    ],
    materials: ["Carbon Steel (API 5L X65)", "13Cr Martensitic SS", "22Cr Duplex", "Hastelloy C-276"]
  }
];

const AppSelection = () => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [suggestedMaterials, setSuggestedMaterials] = useState<MaterialSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (selectedApp) {
      loadMaterialSuggestions(selectedApp);
    }
  }, [selectedApp]);

  const loadMaterialSuggestions = async (appId: string) => {
    setLoadingSuggestions(true);
    try {
      const result = await fetchMaterialSuggestions(appId);
      setSuggestedMaterials(result.topMaterials);
      toast({
        title: "Material Suggestions Loaded",
        description: `Found ${result.topMaterials.length} recommended materials`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load material suggestions",
        variant: "destructive"
      });
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const handleContinue = () => {
    if (selectedApp) {
      navigate(`/data-ingestion?app=${selectedApp}`);
    }
  };

  const selectedApplication = applications.find(app => app.id === selectedApp);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            MatBOT AI Platform
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Select Your Application Domain
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the industry-specific material selection module to get tailored recommendations 
            based on your application requirements.
          </p>
        </div>

        {/* Application Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {applications.map((app, index) => (
            <Card 
              key={app.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-elevated hover:-translate-y-1 ${
                selectedApp === app.id 
                  ? 'ring-2 ring-primary border-primary bg-primary/5' 
                  : 'hover:border-primary/50'
              }`}
              onClick={() => setSelectedApp(app.id)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                  selectedApp === app.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  {app.icon}
                </div>
                <CardTitle className="flex items-center justify-between">
                  {app.title}
                  {selectedApp === app.id && (
                    <CheckCircle className="h-5 w-5 text-primary" />
                  )}
                </CardTitle>
                <CardDescription className="text-sm">
                  {app.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {app.features.map((feature, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Selected Application Details */}
        {selectedApplication && (
          <Card className="mb-8 border-primary/20 bg-gradient-card animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Selected: {selectedApplication.title}
                  </CardTitle>
                  <CardDescription>
                    AI-recommended materials from web sources
                  </CardDescription>
                </div>
                {loadingSuggestions && (
                  <Loader2 className="h-5 w-5 animate-spin text-primary" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              {loadingSuggestions ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse bg-muted h-24 rounded-lg" />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {suggestedMaterials.map((material, idx) => {
                    const handleMaterialClick = () => {
                      const searchQuery = `${material.materialFamily} ${material.grade}`;
                      const matwebUrl = `https://www.matweb.com/search/QuickText.aspx?SearchText=${encodeURIComponent(searchQuery)}`;
                      window.open(matwebUrl, '_blank', 'noopener,noreferrer');
                    };

                    return (
                    <div 
                      key={idx}
                      className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-md cursor-pointer"
                      onClick={handleMaterialClick}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {material.materialFamily}
                          </h4>
                          <p className="text-sm text-primary font-medium">
                            Grade: {material.grade}
                          </p>
                        </div>
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded">
                          #{idx + 1}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 p-3 bg-muted/30 rounded border border-border">
                        {material.keyProperties.tensileStrength && (
                          <div className="text-xs">
                            <span className="text-muted-foreground block">Tensile:</span>
                            <span className="font-semibold text-foreground">{material.keyProperties.tensileStrength}</span>
                          </div>
                        )}
                        {material.keyProperties.yieldStrength && (
                          <div className="text-xs">
                            <span className="text-muted-foreground block">Yield:</span>
                            <span className="font-semibold text-foreground">{material.keyProperties.yieldStrength}</span>
                          </div>
                        )}
                        {material.keyProperties.hardness && (
                          <div className="text-xs">
                            <span className="text-muted-foreground block">Hardness:</span>
                            <span className="font-semibold text-foreground">{material.keyProperties.hardness}</span>
                          </div>
                        )}
                        {material.keyProperties.corrosionResistance && (
                          <div className="text-xs">
                            <span className="text-muted-foreground block">Corrosion:</span>
                            <span className="font-semibold text-foreground">{material.keyProperties.corrosionResistance}</span>
                          </div>
                        )}
                        {material.keyProperties.temperatureRange && (
                          <div className="text-xs">
                            <span className="text-muted-foreground block">Temp Range:</span>
                            <span className="font-semibold text-foreground">{material.keyProperties.temperatureRange}</span>
                          </div>
                        )}
                        {material.keyProperties.elongation && (
                          <div className="text-xs">
                            <span className="text-muted-foreground block">Elongation:</span>
                            <span className="font-semibold text-foreground">{material.keyProperties.elongation || '40%'}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-3 pt-3 border-t border-border">
                        <span>Click to view full specifications on MatWeb</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button 
            size="lg"
            onClick={handleContinue}
            disabled={!selectedApp}
            className="gap-2 px-8"
          >
            Continue to Data Ingestion
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AppSelection;

