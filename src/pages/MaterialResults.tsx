import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, Medal, Award, Download, FileText, FileSpreadsheet, 
  CheckCircle, ArrowRight, Sparkles, TrendingUp, TrendingDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fetchMaterialSuggestions } from "@/services/materialSuggestions";
import { rankMaterials, type RankedMaterial } from "@/services/materialRanking";
import { exportToCSV as exportToExcel, exportToTXT as exportToWord } from "@/services/unstructuredService";

const MaterialResults = () => {
  const [searchParams] = useSearchParams();
  const app = searchParams.get('app') || 'cryogenic';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [rankedMaterials, setRankedMaterials] = useState<RankedMaterial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    performAnalysis();
  }, []);

  const performAnalysis = async () => {
    setLoading(true);

    try {
      // Get analysis criteria from session storage
      const analysisDataStr = sessionStorage.getItem('analysisData');
      if (!analysisDataStr) {
        toast({
          title: "Missing Data",
          description: "Please complete all stages first",
          variant: "destructive"
        });
        navigate('/app-selection');
        return;
      }

      const analysisData = JSON.parse(analysisDataStr);

      // Get extracted materials from RAG processing (if available)
      const extractedMaterialsStr = sessionStorage.getItem('extractedMaterials');
      let materialsToRank = [];

      if (extractedMaterialsStr) {
        // Use RAG-extracted materials
        const extractedMaterials = JSON.parse(extractedMaterialsStr);
        
        // Convert extracted materials to ranking format
        materialsToRank = extractedMaterials.map((material: any) => {
          // Parse tensile strength (e.g., "620 MPa" or "90 ksi (620 MPa)")
          const parseTensile = (str: string): number => {
            if (!str) return 0;
            const mpaMatch = str.match(/(\d+)\s*(?:MPa|mpa)/i);
            if (mpaMatch) return parseFloat(mpaMatch[1]);
            const ksiMatch = str.match(/(\d+)\s*ksi/i);
            if (ksiMatch) return parseFloat(ksiMatch[1]) * 6.895; // Convert ksi to MPa
            return 0;
          };

          // Parse yield strength
          const parseYield = (str: string): number => {
            if (!str) return 0;
            const mpaMatch = str.match(/(\d+)\s*(?:MPa|mpa)/i);
            if (mpaMatch) return parseFloat(mpaMatch[1]);
            const ksiMatch = str.match(/(\d+)\s*ksi/i);
            if (ksiMatch) return parseFloat(ksiMatch[1]) * 6.895;
            return 0;
          };

          // Parse hardness (e.g., "265 HB" or "290 HB")
          const parseHardness = (str: string): number => {
            if (!str) return 0;
            const match = str.match(/(\d+)\s*(?:HB|HRC|HV)?/i);
            return match ? parseFloat(match[1]) : 0;
          };

          // Parse temperature range
          const parseTemp = (str: string): { min: number; max: number } => {
            if (!str) return { min: -50, max: 300 };
            const match = str.match(/(-?\d+).*?(?:to|-).*?(\d+)/i);
            if (match) {
              return { min: parseFloat(match[1]), max: parseFloat(match[2]) };
            }
            return { min: -50, max: 300 };
          };

          // Parse cost level to index
          const parseCost = (str: string): number => {
            if (!str) return 5;
            const lower = str.toLowerCase();
            if (lower.includes('low') || lower.includes('economical')) return 3;
            if (lower.includes('moderate')) return 5;
            if (lower.includes('high') && !lower.includes('very')) return 7;
            if (lower.includes('very high')) return 9;
            return 5;
          };

          // Use direct maxTemp/minTemp if available, otherwise parse from temperature string
          let maxTemp = material.maxTemp || material.maxTemperature;
          let minTemp = material.minTemp || material.minTemperature;
          
          // If not available, try parsing from temperature string
          if (!maxTemp || !minTemp) {
            const tempStr = material.temperature || '';
            const match = tempStr.match(/(-?\d+).*?(?:to|-).*?(\d+)/i);
            if (match) {
              minTemp = minTemp || parseFloat(match[1]);
              maxTemp = maxTemp || parseFloat(match[2]);
            } else {
              // Defaults
              minTemp = minTemp || -50;
              maxTemp = maxTemp || 300;
            }
          }
          
          return {
            name: material.name,
            materialFamily: material.family || 'Duplex Stainless Steel',
            grade: material.grade || material.name,
            composition: material.family || material.composition || 'Unknown',
            density: parseFloat(material.density) || 7.8,
            tensileStrength: parseTensile(material.tensileStrength),
            yieldStrength: parseYield(material.yieldStrength),
            hardness: parseHardness(material.hardness),
            corrosionResistance: material.corrosionResistance || 'Good',
            weldability: material.weldability || 'Good',
            maxTemp: maxTemp,
            minTemp: minTemp,
            keyProperties: {
              tensileStrength: material.tensileStrength,
              yieldStrength: material.yieldStrength,
              hardness: material.hardness,
              temperatureRange: material.temperature || `${minTemp}°C to ${maxTemp}°C`,
              corrosionResistance: material.corrosionResistance || 'Good',
              weldability: material.weldability || 'Good'
            },
            standards: material.standards || [],
            costIndex: parseCost(material.cost),
            applications: material.applications || [app]
          };
        });

        console.log('📊 Materials to rank:', materialsToRank);

        toast({
          title: "Using RAG Data",
          description: `Ranking ${materialsToRank.length} extracted materials`,
        });
      } else {
        // Fallback to default material suggestions
        const { topMaterials } = await fetchMaterialSuggestions(app);
        materialsToRank = topMaterials;

        toast({
          title: "Using Default Materials",
          description: "No RAG data found, using material database",
        });
      }

      // Prepare criteria
      const criteria = {
        temperature: parseFloat(analysisData.designRequirements.temperature) || 0,
        pressure: parseFloat(analysisData.designRequirements.pressure) || 0,
        stress: 0, // Removed from UI but kept for compatibility
        tensileStrength: parseFloat(analysisData.mechanicalProperties.tensileStrength) || 0,
        yieldStrength: parseFloat(analysisData.mechanicalProperties.yieldStrength) || 0,
        hardness: parseFloat(analysisData.mechanicalProperties.hardness) || 0,
        elongation: parseFloat(analysisData.mechanicalProperties.elongation) || 0,
        standards: Object.entries(analysisData.standards)
          .filter(([_, value]) => value)
          .map(([key]) => key.toUpperCase())
      };

      console.log('🎯 Ranking criteria:', criteria);
      console.log('📋 Materials to rank:', materialsToRank.length);

      // Rank materials
      const ranked = rankMaterials(materialsToRank, criteria);
      console.log('✅ Ranked materials:', ranked.length);
      
      setRankedMaterials(ranked);
      
      // STORE ranked materials in sessionStorage for Analytics page
      sessionStorage.setItem('rankedMaterials', JSON.stringify(ranked));
      console.log('💾 Stored ranked materials in sessionStorage for analytics');

      if (ranked.length === 0) {
        toast({
          title: "No Materials Matched",
          description: "No materials met the specified criteria",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Analysis Complete",
          description: `Top ${ranked.length} materials identified`,
        });
      }
    } catch (error: any) {
      console.error('❌ Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error.message || "Unable to complete material ranking",
        variant: "destructive"
      });
      setRankedMaterials([]); // Set empty array to show "No materials" instead of loading forever
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadCSV = () => {
    // Get original extracted materials with all properties
    const extractedMaterialsStr = sessionStorage.getItem('extractedMaterials');
    let exportData: any[] = [];

    if (extractedMaterialsStr) {
      const extractedMaterials = JSON.parse(extractedMaterialsStr);
      
      console.log('📤 EXPORT DEBUG:');
      console.log('Ranked materials:', rankedMaterials.map(r => r.grade));
      console.log('Extracted materials:', extractedMaterials.map((m: any) => m.grade || m.name));
      
      // Merge ranking data with original material data
      exportData = rankedMaterials.map((ranked, index) => {
        // Find the original material by matching grade EXACTLY
        const originalMaterial = extractedMaterials.find((m: any) => {
          // Try exact grade match first
          if (m.grade && m.grade === ranked.grade) return true;
          // Try name match with grade
          if (m.name && m.name.includes(ranked.grade)) return true;
          // Try grade in name
          if (m.grade && ranked.materialFamily && ranked.materialFamily.includes(m.grade)) return true;
          return false;
        });

        if (!originalMaterial) {
          console.warn(`⚠️ No match found for ranked material: ${ranked.grade}`);
        } else {
          console.log(`✅ Matched ${ranked.grade} → ${originalMaterial.grade || originalMaterial.name}`);
        }

        const material = originalMaterial || {};

        return {
          ID: index + 1,
          Rank: ranked.rank,
          MaterialName: material.name || ranked.materialFamily,
          MaterialFamily: material.family || ranked.materialFamily,
          Grade: material.grade || ranked.grade,
          Designation: material.designation || 'N/A',
          
          // Chemical Composition
          Composition: originalMaterial.composition || 'N/A',
          Chromium: originalMaterial.chromium || 'N/A',
          Nickel: originalMaterial.nickel || 'N/A',
          Molybdenum: originalMaterial.molybdenum || 'N/A',
          Nitrogen: originalMaterial.nitrogen || 'N/A',
          Carbon: originalMaterial.carbon || 'N/A',
          Copper: originalMaterial.copper || 'N/A',
          
          // Mechanical Properties
          TensileStrength: originalMaterial.tensileStrength || 'N/A',
          YieldStrength: originalMaterial.yieldStrength || 'N/A',
          Elongation: originalMaterial.elongation || 'N/A',
          Hardness: originalMaterial.hardness || 'N/A',
          
          // Heat Treatment
          HeatTreatmentTemp: originalMaterial.temperature || 'N/A',
          SoakingTime: originalMaterial.soakingTime || 'N/A',
          Cooling: originalMaterial.cooling || 'N/A',
          
          // Welding Parameters
          Weldability: originalMaterial.weldability || 'N/A',
          WeldingElectrode: originalMaterial.weldingElectrode || 'N/A',
          Preheating: originalMaterial.preheating || 'N/A',
          InterpassTemp: originalMaterial.interpassTemp || 'N/A',
          HeatInput: originalMaterial.heatInput || 'N/A',
          PostweldHT: originalMaterial.postweldHT || 'N/A',
          
          // Additional Properties
          CorrosionResistance: originalMaterial.corrosionResistance || 'N/A',
          Applications: Array.isArray(originalMaterial.applications) 
            ? originalMaterial.applications.join('; ') 
            : (originalMaterial.applications || 'N/A'),
          Standards: Array.isArray(originalMaterial.standards)
            ? originalMaterial.standards.join(', ')
            : (originalMaterial.standards || 'N/A'),
          Cost: originalMaterial.cost || 'N/A',
          Structure: originalMaterial.structure || 'N/A',
          MinTemperature: originalMaterial.minTemperature || 'N/A',
          EmbrittlementRange: originalMaterial.embrittlementRange || 'N/A',
          
          // Ranking Scores
          OverallScore: ranked.overallScore,
          DesignScore: ranked.scores.designRequirements,
          MechanicalScore: ranked.scores.mechanicalProperties,
          StandardsScore: ranked.scores.standards,
          CostScore: ranked.scores.costEfficiency,
          Recommendation: ranked.recommendation,
        };
      });
    } else {
      // Fallback if no extracted materials
      exportData = rankedMaterials.map((material, index) => ({
        ID: index + 1,
        Rank: material.rank,
        MaterialName: material.materialFamily,
        Grade: material.grade,
        OverallScore: material.overallScore,
        DesignScore: material.scores.designRequirements,
        MechanicalScore: material.scores.mechanicalProperties,
        StandardsScore: material.scores.standards,
        CostScore: material.scores.costEfficiency,
        Recommendation: material.recommendation,
      }));
    }

    const fileName = sessionStorage.getItem('uploadedFileName') || 'document';
    exportToExcel(exportData, `${fileName}-top3-materials.xlsx`);

    toast({
      title: "Excel Downloaded",
      description: "Top 3 materials exported successfully",
    });
  };

  const handleDownloadText = async () => {
    // Get original extracted materials with all properties
    const extractedMaterialsStr = sessionStorage.getItem('extractedMaterials');
    let exportData: any[] = [];
    let rawText = '';

    if (extractedMaterialsStr) {
      const extractedMaterials = JSON.parse(extractedMaterialsStr);
      
      // Merge ranking data with original material data
      exportData = rankedMaterials.map((ranked, index) => {
        const originalMaterial = extractedMaterials.find((m: any) => 
          m.grade === ranked.grade || m.name === ranked.materialFamily
        ) || extractedMaterials[index] || {};

        return {
          MaterialName: originalMaterial.name || ranked.materialFamily,
          MaterialFamily: originalMaterial.family || ranked.materialFamily,
          Grade: originalMaterial.grade || ranked.grade,
          Designation: originalMaterial.designation || 'N/A',
          
          // Chemical Composition
          Composition: originalMaterial.composition || 'N/A',
          Chromium: originalMaterial.chromium || 'N/A',
          Nickel: originalMaterial.nickel || 'N/A',
          Molybdenum: originalMaterial.molybdenum || 'N/A',
          Nitrogen: originalMaterial.nitrogen || 'N/A',
          Carbon: originalMaterial.carbon || 'N/A',
          Copper: originalMaterial.copper || 'N/A',
          
          // Mechanical Properties
          TensileStrength: originalMaterial.tensileStrength || 'N/A',
          YieldStrength: originalMaterial.yieldStrength || 'N/A',
          Elongation: originalMaterial.elongation || 'N/A',
          Hardness: originalMaterial.hardness || 'N/A',
          
          // Temperature Range
          MaxTemperature: originalMaterial.maxTemp || originalMaterial.maxTemperature || 'N/A',
          MinTemperature: originalMaterial.minTemp || originalMaterial.minTemperature || 'N/A',
          
          // Heat Treatment
          HeatTreatmentTemp: originalMaterial.temperature || 'N/A',
          Cooling: originalMaterial.cooling || 'N/A',
          
          // Properties
          Weldability: originalMaterial.weldability || 'N/A',
          CorrosionResistance: originalMaterial.corrosionResistance || 'N/A',
          Applications: Array.isArray(originalMaterial.applications) 
            ? originalMaterial.applications.join('; ') 
            : (originalMaterial.applications || 'N/A'),
          Standards: Array.isArray(originalMaterial.standards)
            ? originalMaterial.standards.join(', ')
            : (originalMaterial.standards || 'N/A'),
          Cost: originalMaterial.cost || 'N/A',
          Structure: originalMaterial.structure || 'N/A',
          
          // Ranking Information
          Rank: `#${ranked.rank}`,
          OverallScore: `${ranked.overallScore}/100`,
          DesignScore: `${ranked.scores.designRequirements}/100`,
          MechanicalScore: `${ranked.scores.mechanicalProperties}/100`,
          StandardsScore: `${ranked.scores.standards}/100`,
          CostScore: `${ranked.scores.costEfficiency}/100`,
          Recommendation: ranked.recommendation,
        };
      });

      rawText = rankedMaterials.map((m, i) => 
        `${i + 1}. ${m.materialFamily} - Grade: ${m.grade}\nOverall Score: ${m.overallScore}\nRecommendation: ${m.recommendation}\n`
      ).join('\n');
    } else {
      // Fallback
      exportData = rankedMaterials.map((material, index) => ({
        MaterialName: material.materialFamily,
        Grade: material.grade,
        Rank: `#${material.rank}`,
        OverallScore: `${material.overallScore}/100`,
        Recommendation: material.recommendation,
      }));

      rawText = rankedMaterials.map((m, i) => 
        `${i + 1}. ${m.materialFamily} - Grade: ${m.grade}\nOverall Score: ${m.overallScore}\nRecommendation: ${m.recommendation}\n`
      ).join('\n');
    }

    const fileName = sessionStorage.getItem('uploadedFileName') || 'document';
    await exportToWord(exportData, rawText, `${fileName}-top3-materials.docx`);

    toast({
      title: "Word Document Downloaded",
      description: "Top 3 materials exported successfully",
    });
  };

  const getRankIcon = (rank: 1 | 2 | 3) => {
    if (rank === 1) return <Trophy className="h-8 w-8" />;
    if (rank === 2) return <Medal className="h-8 w-8" />;
    return <Award className="h-8 w-8" />;
  };

  const getRankLabel = (rank: 1 | 2 | 3) => {
    if (rank === 1) return 'Best Match';
    if (rank === 2) return 'Strong Alternative';
    return 'Good Option';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12 pt-24">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto animate-pulse">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">Analyzing Materials...</h2>
                  <p className="text-muted-foreground">
                    Ranking materials based on your requirements
                  </p>
                  <Progress value={75} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 pt-24">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium mb-4">
            <CheckCircle className="h-4 w-4" />
            Analysis Complete
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Material Recommendations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Top {rankedMaterials.length} materials ranked by comprehensive multi-criteria analysis
          </p>
        </div>

        {/* Download Buttons */}
        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={handleDownloadCSV} variant="outline" className="gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Download Excel
          </Button>
          <Button onClick={handleDownloadText} variant="outline" className="gap-2">
            <FileText className="h-4 w-4" />
            Download Word
          </Button>
        </div>

        {/* Ranked Materials */}
        <div className="max-w-6xl mx-auto space-y-6 mb-8">
          {rankedMaterials.map((material, index) => {
            // Get additional properties from session storage
            const extractedMaterialsStr = sessionStorage.getItem('extractedMaterials');
            let additionalProps = {};
            if (extractedMaterialsStr) {
              const extractedMaterials = JSON.parse(extractedMaterialsStr);
              const foundMaterial = extractedMaterials.find((m: any) => 
                m.grade === material.grade || m.name === material.materialFamily
              ) || extractedMaterials[index] || {};
              additionalProps = foundMaterial;
            }

            const handleMaterialClick = () => {
              const searchQuery = `${material.materialFamily} ${material.grade}`;
              const matwebUrl = `https://www.matweb.com/search/QuickText.aspx?SearchText=${encodeURIComponent(searchQuery)}`;
              window.open(matwebUrl, '_blank', 'noopener,noreferrer');
            };

            return (
            <Card 
              key={index}
              className={`border-2 ${material.borderColor} ${material.bgColor} animate-fade-in transition-all hover:shadow-lg cursor-pointer`}
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={handleMaterialClick}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 rounded-xl ${material.bgColor} border-2 ${material.borderColor} flex items-center justify-center ${material.color}`}>
                      {getRankIcon(material.rank)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-3 py-1 rounded-full ${material.bgColor} ${material.color} text-sm font-bold border ${material.borderColor}`}>
                          #{material.rank}
                        </span>
                        <span className={`text-xs font-semibold ${material.color}`}>
                          {getRankLabel(material.rank)}
                        </span>
                      </div>
                      <CardTitle className="text-2xl">{material.materialFamily}</CardTitle>
                      <CardDescription className="text-base font-medium text-foreground">
                        Grade: {material.grade}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-foreground">{material.overallScore}</div>
                    <div className="text-sm text-muted-foreground">Overall Score</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Material Properties Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-muted/30 rounded-lg border border-border">
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Tensile</span>
                      <p className="text-sm font-semibold text-foreground">
                        {(additionalProps as any)?.tensileStrength || '485 MPa'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Yield</span>
                      <p className="text-sm font-semibold text-foreground">
                        {(additionalProps as any)?.yieldStrength || '170 MPa'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Hardness</span>
                      <p className="text-sm font-semibold text-foreground">
                        {(additionalProps as any)?.hardness || '217 HB'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Temp Range</span>
                      <p className="text-sm font-semibold text-foreground">
                        {(additionalProps as any)?.temperature || '-196°C to 425°C'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Corrosion</span>
                      <p className="text-sm font-semibold text-foreground">
                        {(additionalProps as any)?.corrosionResistance || 'Excellent'}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-xs text-muted-foreground">Elongation</span>
                      <p className="text-sm font-semibold text-foreground">
                        {(additionalProps as any)?.elongation || '40%'}
                      </p>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Design Req.</span>
                        <span className="font-semibold">{material.scores.designRequirements}</span>
                      </div>
                      <Progress value={material.scores.designRequirements} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Mechanical</span>
                        <span className="font-semibold">{material.scores.mechanicalProperties}</span>
                      </div>
                      <Progress value={material.scores.mechanicalProperties} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Standards</span>
                        <span className="font-semibold">{material.scores.standards}</span>
                      </div>
                      <Progress value={material.scores.standards} className="h-2" />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Cost Eff.</span>
                        <span className="font-semibold">{material.scores.costEfficiency}</span>
                      </div>
                      <Progress value={material.scores.costEfficiency} className="h-2" />
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="flex items-start gap-2">
                      <Sparkles className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-foreground">
                        <span className="font-semibold">Recommendation: </span>
                        {material.recommendation}
                      </p>
                    </div>
                  </div>

                  {/* Click to View Details */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
                    <span>Click card to view full specifications on MatWeb</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate('/app-selection')}>
            New Analysis
          </Button>
          <Button onClick={() => navigate('/analytics')} className="gap-2">
            View Detailed Analytics
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MaterialResults;
