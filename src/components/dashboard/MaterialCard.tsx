import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Thermometer, Gauge, Shield, Leaf, ChevronRight, Star } from "lucide-react";

interface MaterialProperty {
  label: string;
  value: string;
  icon: React.ElementType;
}

interface MaterialCardProps {
  name: string;
  standard: string;
  matchScore: number;
  properties: MaterialProperty[];
  applications: string[];
  sustainable?: boolean;
}

export function MaterialCard({
  name,
  standard,
  matchScore,
  properties,
  applications,
  sustainable = false,
}: MaterialCardProps) {
  const handleViewSpecifications = () => {
    // Construct MatWeb search URL with material name and standard
    const searchQuery = `${name} ${standard}`;
    const matwebUrl = `https://www.matweb.com/search/QuickText.aspx?SearchText=${encodeURIComponent(searchQuery)}`;
    
    // Open in new tab
    window.open(matwebUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card className="group bg-card border-border shadow-card hover:shadow-elevated transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg text-foreground">{name}</CardTitle>
              {sustainable && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <Leaf className="h-3 w-3 mr-1" />
                  Eco
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground font-mono">{standard}</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-primary/10">
            <Star className="h-3.5 w-3.5 text-primary fill-primary" />
            <span className="text-sm font-semibold text-primary">{matchScore}%</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Properties grid */}
        <div className="grid grid-cols-2 gap-3">
          {properties.map((prop, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <prop.icon className="h-4 w-4 text-muted-foreground" />
              <div>
                <span className="text-muted-foreground">{prop.label}: </span>
                <span className="font-medium font-mono text-foreground">{prop.value}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Applications */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Applications</p>
          <div className="flex flex-wrap gap-1.5">
            {applications.map((app, index) => (
              <Badge key={index} variant="secondary" className="text-xs bg-muted text-muted-foreground">
                {app}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action */}
        <Button 
          variant="ghost" 
          className="w-full justify-between text-foreground hover:text-primary hover:bg-muted"
          onClick={handleViewSpecifications}
        >
          View Full Specifications
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </CardContent>
    </Card>
  );
}
