import { useState } from "react";
import { MaterialCard } from "./MaterialCard";
import { Thermometer, Gauge, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

const ALL_MATERIALS = [
  {
    name: "SS316L",
    standard: "ASTM A240",
    matchScore: 95,
    properties: [
      { label: "Tensile", value: "485 MPa", icon: Gauge },
      { label: "Yield", value: "170 MPa", icon: Zap },
      { label: "Temp Range", value: "-196 to 870°C", icon: Thermometer },
      { label: "Corrosion", value: "Excellent", icon: Shield },
    ],
    applications: ["Cryogenics", "Chemical Processing", "Food & Beverage"],
    sustainable: true,
  },
  {
    name: "Inconel 625",
    standard: "ASTM B443",
    matchScore: 88,
    properties: [
      { label: "Tensile", value: "827 MPa", icon: Gauge },
      { label: "Yield", value: "414 MPa", icon: Zap },
      { label: "Temp Range", value: "-200 to 980°C", icon: Thermometer },
      { label: "Corrosion", value: "Superior", icon: Shield },
    ],
    applications: ["Subsea", "Aerospace", "Oil & Gas"],
    sustainable: false,
  },
  {
    name: "Hastelloy C-276",
    standard: "ASTM B574",
    matchScore: 82,
    properties: [
      { label: "Tensile", value: "690 MPa", icon: Gauge },
      { label: "Yield", value: "283 MPa", icon: Zap },
      { label: "Temp Range", value: "-196 to 1038°C", icon: Thermometer },
      { label: "Corrosion", value: "Superior", icon: Shield },
    ],
    applications: ["Chemical Processing", "Pollution Control", "Pulp & Paper"],
    sustainable: false,
  },
  {
    name: "Duplex 2205",
    standard: "ASTM A240 / EN 1.4462",
    matchScore: 78,
    properties: [
      { label: "Tensile", value: "620 MPa", icon: Gauge },
      { label: "Yield", value: "450 MPa", icon: Zap },
      { label: "Temp Range", value: "-50 to 300°C", icon: Thermometer },
      { label: "Corrosion", value: "Very Good", icon: Shield },
    ],
    applications: ["Oil & Gas", "Desalination", "Chemical Tankers"],
    sustainable: true,
  },
  {
    name: "Monel 400",
    standard: "ASTM B127",
    matchScore: 75,
    properties: [
      { label: "Tensile", value: "550 MPa", icon: Gauge },
      { label: "Yield", value: "240 MPa", icon: Zap },
      { label: "Temp Range", value: "-198 to 480°C", icon: Thermometer },
      { label: "Corrosion", value: "Excellent", icon: Shield },
    ],
    applications: ["Marine", "Chemical Processing", "Valves"],
    sustainable: false,
  },
  {
    name: "Titanium Grade 2",
    standard: "ASTM B265",
    matchScore: 72,
    properties: [
      { label: "Tensile", value: "345 MPa", icon: Gauge },
      { label: "Yield", value: "275 MPa", icon: Zap },
      { label: "Temp Range", value: "-253 to 315°C", icon: Thermometer },
      { label: "Corrosion", value: "Excellent", icon: Shield },
    ],
    applications: ["Aerospace", "Medical", "Chemical Processing"],
    sustainable: true,
  },
  {
    name: "Aluminum 6061-T6",
    standard: "ASTM B221",
    matchScore: 68,
    properties: [
      { label: "Tensile", value: "310 MPa", icon: Gauge },
      { label: "Yield", value: "276 MPa", icon: Zap },
      { label: "Temp Range", value: "-196 to 205°C", icon: Thermometer },
      { label: "Corrosion", value: "Good", icon: Shield },
    ],
    applications: ["Automotive", "Marine", "Structural"],
    sustainable: true,
  },
  {
    name: "Copper C110",
    standard: "ASTM B152",
    matchScore: 65,
    properties: [
      { label: "Tensile", value: "220 MPa", icon: Gauge },
      { label: "Yield", value: "70 MPa", icon: Zap },
      { label: "Temp Range", value: "-200 to 150°C", icon: Thermometer },
      { label: "Corrosion", value: "Very Good", icon: Shield },
    ],
    applications: ["Electrical", "Plumbing", "Heat Exchangers"],
    sustainable: true,
  },
  {
    name: "Brass C260",
    standard: "ASTM B36",
    matchScore: 62,
    properties: [
      { label: "Tensile", value: "380 MPa", icon: Gauge },
      { label: "Yield", value: "125 MPa", icon: Zap },
      { label: "Temp Range", value: "-100 to 200°C", icon: Thermometer },
      { label: "Corrosion", value: "Good", icon: Shield },
    ],
    applications: ["Hardware", "Fasteners", "Decorative"],
    sustainable: false,
  },
  {
    name: "Nickel 200",
    standard: "ASTM B162",
    matchScore: 60,
    properties: [
      { label: "Tensile", value: "462 MPa", icon: Gauge },
      { label: "Yield", value: "148 MPa", icon: Zap },
      { label: "Temp Range", value: "-196 to 315°C", icon: Thermometer },
      { label: "Corrosion", value: "Excellent", icon: Shield },
    ],
    applications: ["Chemical", "Food Processing", "Electronics"],
    sustainable: false,
  },
  {
    name: "Incoloy 800",
    standard: "ASTM B409",
    matchScore: 58,
    properties: [
      { label: "Tensile", value: "520 MPa", icon: Gauge },
      { label: "Yield", value: "205 MPa", icon: Zap },
      { label: "Temp Range", value: "-198 to 815°C", icon: Thermometer },
      { label: "Corrosion", value: "Very Good", icon: Shield },
    ],
    applications: ["Heat Treating", "Power Generation", "Petrochemical"],
    sustainable: false,
  },
  {
    name: "Zirconium 702",
    standard: "ASTM B551",
    matchScore: 55,
    properties: [
      { label: "Tensile", value: "380 MPa", icon: Gauge },
      { label: "Yield", value: "207 MPa", icon: Zap },
      { label: "Temp Range", value: "-195 to 400°C", icon: Thermometer },
      { label: "Corrosion", value: "Excellent", icon: Shield },
    ],
    applications: ["Nuclear", "Chemical Processing", "Heat Exchangers"],
    sustainable: false,
  },
  {
    name: "Tantalum R05200",
    standard: "ASTM B708",
    matchScore: 52,
    properties: [
      { label: "Tensile", value: "207 MPa", icon: Gauge },
      { label: "Yield", value: "138 MPa", icon: Zap },
      { label: "Temp Range", value: "-253 to 300°C", icon: Thermometer },
      { label: "Corrosion", value: "Superior", icon: Shield },
    ],
    applications: ["Chemical Processing", "Electronics", "Medical"],
    sustainable: false,
  },
];

const MATERIALS_PER_PAGE = 6;

export function MaterialsGrid() {
  const [visibleCount, setVisibleCount] = useState(MATERIALS_PER_PAGE);
  const [sortBy, setSortBy] = useState<"match" | "tensile" | "yield" | "name">("match");
  const [filterSustainable, setFilterSustainable] = useState<boolean | null>(null);
  const [filterCorrosion, setFilterCorrosion] = useState<string | null>(null);

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + MATERIALS_PER_PAGE, ALL_MATERIALS.length));
  };

  // Filter materials
  let filteredMaterials = [...ALL_MATERIALS];
  
  if (filterSustainable !== null) {
    filteredMaterials = filteredMaterials.filter(m => m.sustainable === filterSustainable);
  }
  
  if (filterCorrosion) {
    filteredMaterials = filteredMaterials.filter(m => {
      const corrosionProp = m.properties.find(p => p.label === "Corrosion");
      return corrosionProp?.value === filterCorrosion;
    });
  }

  // Sort materials
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    switch (sortBy) {
      case "match":
        return b.matchScore - a.matchScore;
      case "tensile":
        const tensileA = parseInt(a.properties.find(p => p.label === "Tensile")?.value || "0");
        const tensileB = parseInt(b.properties.find(p => p.label === "Tensile")?.value || "0");
        return tensileB - tensileA;
      case "yield":
        const yieldA = parseInt(a.properties.find(p => p.label === "Yield")?.value || "0");
        const yieldB = parseInt(b.properties.find(p => p.label === "Yield")?.value || "0");
        return yieldB - yieldA;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const displayedMaterials = sortedMaterials.slice(0, visibleCount);
  const hasMore = visibleCount < sortedMaterials.length;

  const activeFiltersCount = (filterSustainable !== null ? 1 : 0) + (filterCorrosion ? 1 : 0);

  const handleClearFilters = () => {
    setFilterSustainable(null);
    setFilterCorrosion(null);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-foreground">Recommended Materials</h2>
            <p className="text-muted-foreground">
              Based on your design requirements and industry standards
            </p>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-card">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                  Sustainability
                </DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={filterSustainable === true}
                  onCheckedChange={(checked) => setFilterSustainable(checked ? true : null)}
                >
                  Eco-Friendly Only
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterSustainable === false}
                  onCheckedChange={(checked) => setFilterSustainable(checked ? false : null)}
                >
                  Non Eco-Friendly
                </DropdownMenuCheckboxItem>
                
                <DropdownMenuSeparator />
                
                <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                  Corrosion Resistance
                </DropdownMenuLabel>
                <DropdownMenuCheckboxItem
                  checked={filterCorrosion === "Superior"}
                  onCheckedChange={(checked) => setFilterCorrosion(checked ? "Superior" : null)}
                >
                  Superior
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterCorrosion === "Excellent"}
                  onCheckedChange={(checked) => setFilterCorrosion(checked ? "Excellent" : null)}
                >
                  Excellent
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterCorrosion === "Very Good"}
                  onCheckedChange={(checked) => setFilterCorrosion(checked ? "Very Good" : null)}
                >
                  Very Good
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterCorrosion === "Good"}
                  onCheckedChange={(checked) => setFilterCorrosion(checked ? "Good" : null)}
                >
                  Good
                </DropdownMenuCheckboxItem>

                {activeFiltersCount > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleClearFilters}>
                      Clear All Filters
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="bg-card">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Sort by Match
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setSortBy("match")}>
                  <Check className={`h-4 w-4 mr-2 ${sortBy === "match" ? "opacity-100" : "opacity-0"}`} />
                  Match Score (High to Low)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("tensile")}>
                  <Check className={`h-4 w-4 mr-2 ${sortBy === "tensile" ? "opacity-100" : "opacity-0"}`} />
                  Tensile Strength
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("yield")}>
                  <Check className={`h-4 w-4 mr-2 ${sortBy === "yield" ? "opacity-100" : "opacity-0"}`} />
                  Yield Strength
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy("name")}>
                  <Check className={`h-4 w-4 mr-2 ${sortBy === "name" ? "opacity-100" : "opacity-0"}`} />
                  Name (A-Z)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedMaterials.map((material, index) => (
            <MaterialCard key={index} {...material} />
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-card hover:bg-muted"
              onClick={handleLoadMore}
            >
              Load More Materials ({sortedMaterials.length - visibleCount} remaining)
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}