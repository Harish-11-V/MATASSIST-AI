import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { FileText, ArrowRight, Thermometer, Droplets, Shield } from "lucide-react";

export function ExploreStandardsSection() {
  const navigate = useNavigate();

  const standards = [
    {
      name: "ASTM A890",
      fullName: "Cast Duplex Stainless Steel",
      description: "Castings for corrosion-resistant applications with high strength and superior pitting resistance.",
      grades: 8,
      icon: Droplets,
      color: "from-blue-600 to-cyan-600",
      features: [
        "Duplex & Super Duplex grades",
        "Corrosion resistant castings",
        "Oil & Gas applications",
        "Marine environments"
      ],
      route: "/a890-demo",
      maxTemp: "350°C",
      keyGrade: "Grade 5A/6A"
    },
    {
      name: "ASTM A182",
      fullName: "Forged Pipe Flanges & Fittings",
      description: "Forged or rolled alloy and stainless steel for high-temperature pressure systems and piping components.",
      grades: 10,
      icon: Thermometer,
      color: "from-orange-600 to-red-600",
      features: [
        "Low Alloy to Super Duplex",
        "High-temperature service",
        "Pressure vessel components",
        "Wide temperature range"
      ],
      route: "/a182-demo",
      maxTemp: "870°C",
      keyGrade: "F316L/F91"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-slate-100 border-y border-border">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 text-foreground flex items-center justify-center gap-3">
            <FileText className="h-8 w-8 text-primary" />
            Explore ASTM Standards
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive material databases with full specifications, applications, and AI-powered selection guidance
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {standards.map((standard, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-2 border-border hover:border-primary/40 hover:shadow-2xl transition-all duration-300"
            >
              <CardHeader className={`bg-gradient-to-r ${standard.color} text-white pb-8`}>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2 flex items-center gap-2">
                      <standard.icon className="h-6 w-6" />
                      {standard.name}
                    </CardTitle>
                    <CardDescription className="text-blue-50 font-medium">
                      {standard.fullName}
                    </CardDescription>
                  </div>
                  <Badge className="bg-white/20 text-white border-white/30">
                    {standard.grades} Grades
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {standard.description}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-100 rounded-lg p-3">
                    <div className="text-xs text-slate-600 mb-1">Max Operating Temp</div>
                    <div className="text-lg font-bold text-slate-900">{standard.maxTemp}</div>
                  </div>
                  <div className="bg-slate-100 rounded-lg p-3">
                    <div className="text-xs text-slate-600 mb-1">Key Grade</div>
                    <div className="text-lg font-bold text-slate-900">{standard.keyGrade}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {standard.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-primary mt-1">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Button 
                  onClick={() => navigate(standard.route)}
                  className="w-full group-hover:shadow-lg transition-all duration-300"
                  size="lg"
                >
                  Explore {standard.name} Standard
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Each standard includes comprehensive grade documentation, mechanical properties, heat treatment requirements,
            and real-world application examples
          </p>
        </div>
      </div>
    </section>
  );
}
