import { Card } from "@/components/ui/card";
import { useState } from "react";
import { ChevronDown, CheckCircle2, FileText, Globe, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const STANDARDS = [
  { 
    name: "ASTM", 
    description: "American Society for Testing and Materials",
    overview: "ASTM International develops and publishes voluntary consensus technical standards for materials, products, systems, and services. Used extensively in North America for metal specifications.",
    specs: "Over 12,000+ standards covering metals, plastics, petroleum, construction materials",
    icon: CheckCircle2,
    materials: [
      { name: "SS316L", standard: "ASTM A240", category: "Stainless Steel", applications: ["Cryogenics", "Chemical Processing"] },
      { name: "Carbon Steel A36", standard: "ASTM A36", category: "Structural Steel", applications: ["Construction", "Bridges"] },
      { name: "Aluminum 6061", standard: "ASTM B221", category: "Aluminum Alloy", applications: ["Automotive", "Aerospace"] },
      { name: "Copper C110", standard: "ASTM B152", category: "Copper", applications: ["Electrical", "Plumbing"] }
    ]
  },
  { 
    name: "DIN", 
    description: "Deutsches Institut für Normung",
    overview: "German national organization for standardization. DIN standards are widely recognized in Europe and provide detailed specifications for engineering materials.",
    specs: "35,000+ standards covering mechanical engineering, materials science, and industrial processes",
    icon: FileText,
    materials: [
      { name: "1.4401 (316)", standard: "DIN 17440", category: "Stainless Steel", applications: ["Food Processing", "Marine"] },
      { name: "C45 Steel", standard: "DIN 17200", category: "Carbon Steel", applications: ["Gears", "Shafts"] },
      { name: "GG-25", standard: "DIN 1691", category: "Cast Iron", applications: ["Engine Blocks", "Machine Parts"] },
      { name: "CuZn37", standard: "DIN 17660", category: "Brass", applications: ["Fittings", "Valves"] }
    ]
  },
  { 
    name: "EN", 
    description: "European Standards",
    overview: "European Standards (EN) are technical specifications approved by recognized European Standards Organizations. They ensure product safety and performance across EU markets.",
    specs: "Harmonized standards for materials used in pressure equipment, construction, and manufacturing",
    icon: Globe,
    materials: [
      { name: "S355J2", standard: "EN 10025", category: "Structural Steel", applications: ["Buildings", "Offshore"] },
      { name: "X5CrNi18-10", standard: "EN 10088", category: "Stainless Steel", applications: ["Tanks", "Pipes"] },
      { name: "P265GH", standard: "EN 10028", category: "Pressure Vessel Steel", applications: ["Boilers", "Pressure Equipment"] },
      { name: "AlMg3", standard: "EN 573", category: "Aluminum", applications: ["Shipbuilding", "Transport"] }
    ]
  },
  { 
    name: "ISO", 
    description: "International Organization for Standardization",
    overview: "ISO develops international standards that ensure products and services are safe, reliable and of good quality. Recognized globally across 165 countries.",
    specs: "24,000+ international standards covering all industries, including material specifications and testing methods",
    icon: Globe,
    materials: [
      { name: "ISO 630 Steel", standard: "ISO 630", category: "Structural Steel", applications: ["General Engineering", "Construction"] },
      { name: "Ti Grade 2", standard: "ISO 5832-2", category: "Titanium", applications: ["Medical Implants", "Aerospace"] },
      { name: "ISO 9606 Welding", standard: "ISO 9606", category: "Welding Qualification", applications: ["All Industries", "Certification"] },
      { name: "Polyethylene PE-HD", standard: "ISO 1872", category: "Polymer", applications: ["Pipes", "Containers"] }
    ]
  },
];

export function StandardsBanner() {
  const [selectedStandard, setSelectedStandard] = useState<number | null>(null);

  const handleStandardClick = (index: number) => {
    setSelectedStandard(selectedStandard === index ? null : index);
  };
  return (
    <section className="py-12 border-y border-border bg-muted/30">
      <div className="container">
        <p className="text-center text-sm text-muted-foreground mb-6">
          Material data sourced from global engineering standards
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STANDARDS.map((standard, index) => (
            <Card 
              key={index} 
              className="p-4 text-center bg-card border-border hover:border-primary/30 hover:shadow-card transition-all duration-200 cursor-pointer"
              onClick={() => handleStandardClick(index)}
            >
              <p className="text-2xl font-bold text-primary font-mono">{standard.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{standard.description}</p>
              <ChevronDown className={`h-4 w-4 mx-auto mt-2 text-muted-foreground transition-transform duration-300 ${selectedStandard === index ? 'rotate-180' : ''}`} />
            </Card>
          ))}
        </div>

        {/* AI-Generated Information Panel */}
        {selectedStandard !== null && (
          <div className="mt-6 animate-slide-up">
            <Card className="bg-card border-primary/20 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-border">
                <div className="flex items-center gap-3">
                  {(() => {
                    const IconComponent = STANDARDS[selectedStandard].icon;
                    return IconComponent ? (
                      <div className="p-2 rounded-lg bg-primary/10">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                    ) : null;
                  })()}
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {STANDARDS[selectedStandard].name} Standards
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {STANDARDS[selectedStandard].description}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    <h4 className="text-lg font-semibold text-foreground">Overview</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-3">
                    {STANDARDS[selectedStandard].overview}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-primary" />
                    <h4 className="text-lg font-semibold text-foreground">Specifications</h4>
                  </div>
                  <p className="text-muted-foreground leading-relaxed pl-3">
                    {STANDARDS[selectedStandard].specs}
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                      <span>AI-Enhanced Information</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Related Materials Section */}
              <div className="p-6 bg-muted/30 border-t border-border">
                <h4 className="text-lg font-semibold text-foreground mb-4">
                  Popular Materials under {STANDARDS[selectedStandard].name}
                </h4>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {STANDARDS[selectedStandard].materials.map((material, idx) => (
                    <Card
                      key={idx}
                      className="group bg-white border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <h5 className="font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                            {material.name}
                          </h5>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const searchQuery = encodeURIComponent(`${material.name} ${material.standard} material properties`);
                              window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank', 'noopener,noreferrer');
                            }}
                            className="p-1 rounded-full hover:bg-blue-100 transition-colors"
                            aria-label={`Search for ${material.name}`}
                          >
                            <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                          </button>
                        </div>
                        <p className="text-xs text-slate-700 font-mono">{material.standard}</p>
                        <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-800 border-slate-200">
                          {material.category}
                        </Badge>
                        <div className="space-y-2 mt-2">
                          <p className="text-xs font-semibold text-slate-800">Applications</p>
                          <div className="flex flex-wrap gap-1">
                            {material.applications.map((app, appIdx) => (
                              <span
                                key={appIdx}
                                className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>            </Card>
          </div>
        )}
      </div>
    </section>
  );
}