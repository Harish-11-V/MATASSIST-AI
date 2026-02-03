import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, ArrowLeft, Thermometer, Gauge, Activity, Award, Loader2, CheckCircle2, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { processFileWithUnstructured, exportToCSV, exportToTXT, type ExtractedMaterial } from "@/services/unstructuredService";
import { RAGProcessingSteps } from "@/components/RAGProcessingSteps";

interface DesignRequirements {
  temperature: string;
  pressure: string;
}

interface MechanicalProperties {
  tensileStrength: string;
  yieldStrength: string;
  hardness: string;
  elongation: string;
}

interface Standards {
  astm: boolean;
  iso: boolean;
  en: boolean;
  din: boolean;
}

const MultiStageMenu = () => {
  const [searchParams] = useSearchParams();
  const app = searchParams.get('app') || 'cryogenic';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStage, setCurrentStage] = useState(2); // Stage 1 is application selection
  const [designReq, setDesignReq] = useState<DesignRequirements>({
    temperature: "",
    pressure: ""
  });
  const [mechProps, setMechProps] = useState<MechanicalProperties>({
    tensileStrength: "",
    yieldStrength: "",
    hardness: "",
    elongation: ""
  });
  const [standards, setStandards] = useState<Standards>({
    astm: false,
    iso: false,
    en: false,
    din: false
  });

  // RAG Processing State
  const [ragProcessing, setRagProcessing] = useState(false);
  const [ragCompleted, setRagCompleted] = useState(false);
  const [extractedMaterials, setExtractedMaterials] = useState<ExtractedMaterial[]>([]);
  const [rawText, setRawText] = useState("");
  const [structuredData, setStructuredData] = useState<any[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState<string>("");

  // Trigger RAG processing when entering Menu II (only if not already processed)
  useEffect(() => {
    const alreadyProcessed = sessionStorage.getItem('extractedMaterials');
    if (currentStage === 2 && !ragCompleted && !ragProcessing && !alreadyProcessed) {
      startRagProcessing();
    } else if (alreadyProcessed) {
      // Load from session storage
      setExtractedMaterials(JSON.parse(alreadyProcessed));
      setStructuredData(JSON.parse(sessionStorage.getItem('structuredData') || '[]'));
      setRagCompleted(true);
    }
  }, [currentStage]);

  const startRagProcessing = async () => {
    const filesJson = sessionStorage.getItem('uploadedFiles');
    if (!filesJson) {
      toast({
        title: "No Files Found",
        description: "Please upload files first",
        variant: "destructive",
      });
      navigate("/data-ingestion?app=" + app);
      return;
    }

    // 🔥 CRITICAL FIX: Clear old material data before processing new files
    console.log('🧹 Clearing old sessionStorage data before new processing...');
    sessionStorage.removeItem('extractedMaterials');
    sessionStorage.removeItem('structuredData');
    sessionStorage.removeItem('rawText');
    console.log('✅ Old data cleared - ready for new file processing');

    setRagProcessing(true);

    try {
      const fileDataArray = JSON.parse(filesJson);
      
      toast({
        title: "🚀 RAG Processing Started",
        description: `Processing ${fileDataArray.length} file(s) with Unstructured.io...`,
      });

      const allMaterials: ExtractedMaterial[] = [];
      let allRawText = "";
      const allStructuredData: any[] = [];

      // Store the first file name (without extension) for export naming
      const firstFileName = fileDataArray[0]?.name?.replace(/\.[^/.]+$/, '') || 'document';
      setUploadedFileName(firstFileName);
      sessionStorage.setItem('uploadedFileName', firstFileName);

      for (const fileData of fileDataArray) {
        // Convert base64 back to File
        const response = await fetch(fileData.data);
        const blob = await response.blob();
        const file = new File([blob], fileData.name, { type: fileData.type });

        toast({
          title: "Processing File",
          description: `Extracting data from ${file.name}...`,
        });

        // Process with Unstructured.io
        const result = await processFileWithUnstructured(file);

        if (result.success) {
          allMaterials.push(...result.materials);
          allRawText += `\n\n=== ${file.name} ===\n\n${result.rawText}`;
          allStructuredData.push(...result.structuredData);

          // Track if demo mode was used
          if (result.demoMode) {
            sessionStorage.setItem('demoMode', 'true');
          }

          toast({
            title: result.demoMode ? "🎭 Demo Data Loaded" : "✅ File Processed",
            description: `${result.demoMode ? 'Using pre-configured data: ' : 'Extracted '}${result.materials.length} materials from ${file.name}`,
          });
        } else {
          toast({
            title: "⚠️ Processing Warning",
            description: `Could not fully process ${file.name}: ${result.error}`,
            variant: "destructive",
          });
        }
      }

      setExtractedMaterials(allMaterials);
      setRawText(allRawText);
      setStructuredData(allStructuredData);
      setRagCompleted(true);
      
      // Store in sessionStorage for later stages
      sessionStorage.setItem('extractedMaterials', JSON.stringify(allMaterials));
      sessionStorage.setItem('structuredData', JSON.stringify(allStructuredData));

      const isDemoMode = sessionStorage.getItem('demoMode') === 'true';
      
      toast({
        title: isDemoMode ? "🎭 Demo Data Ready" : "🎉 RAG Processing Complete",
        description: `${isDemoMode ? 'Loaded' : 'Successfully extracted'} ${allMaterials.length} materials. Data ready for analysis!`,
      });
    } catch (error: any) {
      toast({
        title: "RAG Processing Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setRagProcessing(false);
    }
  };

  const handleDownloadCSV = () => {
    const fileName = sessionStorage.getItem('uploadedFileName') || 'document';
    exportToCSV(structuredData, `${fileName}-extracted-materials.xlsx`);
    toast({
      title: "Excel Downloaded",
      description: "Extracted material data exported successfully",
    });
  };

  const handleDownloadTXT = async () => {
    const fileName = sessionStorage.getItem('uploadedFileName') || 'document';
    await exportToTXT(structuredData, rawText, `${fileName}-extracted-materials.docx`);
    toast({
      title: "Word Document Downloaded",
      description: "Extracted material report exported successfully",
    });
  };

  const handleNext = () => {
    if (!ragCompleted) {
      toast({
        title: "Wait for Processing",
        description: "RAG data extraction is still in progress...",
        variant: "destructive",
      });
      return;
    }

    if (currentStage === 2) {
      if (!designReq.temperature || !designReq.pressure) {
        toast({
          title: "Missing Information",
          description: "Please fill in all design requirements",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStage === 3) {
      if (!mechProps.tensileStrength || !mechProps.yieldStrength || !mechProps.hardness || !mechProps.elongation) {
        toast({
          title: "Missing Information",
          description: "Please fill in all mechanical properties",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStage === 4) {
      if (!standards.astm && !standards.iso && !standards.en && !standards.din) {
        toast({
          title: "Missing Information",
          description: "Please select at least one standard",
          variant: "destructive"
        });
        return;
      }
    }
    
    if (currentStage < 4) {
      setCurrentStage(currentStage + 1);
    }
  };

  const handleBack = () => {
    if (currentStage > 2) {
      setCurrentStage(currentStage - 1);
    }
  };

  const handleRun = () => {
    // Store all data in session storage
    const analysisData = {
      application: app,
      designRequirements: designReq,
      mechanicalProperties: mechProps,
      standards: standards,
      timestamp: new Date().toISOString()
    };
    
    sessionStorage.setItem('analysisData', JSON.stringify(analysisData));
    
    toast({
      title: "Analysis Started",
      description: "Processing your material recommendations...",
    });
    
    // Navigate to material results page
    navigate(`/material-results?app=${app}`);
  };

  const appLabels: Record<string, string> = {
    cryogenic: 'Cryogenic Applications',
    subsea: 'Subsea Applications',
    'oil-gas': 'Oil & Gas Applications'
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 pt-24">
        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative">
            {/* Progress Line Background */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-muted -translate-y-1/2" style={{ left: '10%', right: '10%' }} />
            
            {/* Active Progress Line */}
            <div 
              className="absolute top-6 left-0 h-0.5 bg-success -translate-y-1/2 transition-all duration-500 ease-in-out"
              style={{ 
                left: '10%',
                width: `${Math.max(0, ((currentStage - 1) / 3) * 80)}%`
              }}
            />
            
            {/* Steps */}
            <div className="relative flex items-start justify-between">
              {[
                { stage: 1, label: "Application" },
                { stage: 2, label: "Design Input" },
                { stage: 3, label: "Mechanical Props" },
                { stage: 4, label: "Standards" }
              ].map((item) => (
                <div key={item.stage} className="flex flex-col items-center flex-1">
                  {/* Circle */}
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold z-10 relative
                    transition-all duration-300 ease-in-out
                    ${item.stage < currentStage 
                      ? 'bg-success text-success-foreground scale-100' 
                      : item.stage === currentStage 
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110 shadow-lg' 
                        : 'bg-muted text-muted-foreground scale-90'
                    }
                  `}>
                    {item.stage}
                  </div>
                  
                  {/* Label */}
                  <span className={`
                    text-xs text-center mt-3 whitespace-nowrap
                    transition-all duration-300
                    ${item.stage === currentStage 
                      ? 'text-primary font-semibold' 
                      : item.stage < currentStage
                        ? 'text-success'
                        : 'text-muted-foreground'
                    }
                  `}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RAG Processing Status - Only shown during and after Menu II */}
        {currentStage >= 2 && (
          <div className="max-w-3xl mx-auto mb-6 space-y-4">
            {ragProcessing && (
              <Card className="border-primary">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <div>
                      <h3 className="font-semibold text-lg">Processing Files with RAG...</h3>
                      <p className="text-sm text-muted-foreground">
                        Extracting material data using Unstructured.io API
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {ragCompleted && !ragProcessing && (
              <Card className="border-success">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CheckCircle2 className="h-8 w-8 text-success" />
                      <div>
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                          ✅ RAG Processing Complete
                          {sessionStorage.getItem('demoMode') === 'true' && (
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-normal">
                              DEMO MODE
                            </span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {sessionStorage.getItem('demoMode') === 'true' 
                            ? `Loaded ${extractedMaterials.length} materials (Pre-configured Duplex data)`
                            : `Extracted ${extractedMaterials.length} materials from uploaded files`
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadCSV}
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Excel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleDownloadTXT}
                        className="gap-2"
                      >
                        <Download className="h-4 w-4" />
                        Word
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        <div className="max-w-3xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Stage {currentStage} - Menu {currentStage === 2 ? 'II' : currentStage === 3 ? 'III' : 'IV'}</CardTitle>
              <CardDescription>
                Application: {appLabels[app]}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Stage 2: Design Input Requirements */}
              {currentStage === 2 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <Thermometer className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Design Input Requirements</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Operating Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      placeholder="e.g., -196"
                      value={designReq.temperature}
                      onChange={(e) => setDesignReq({ ...designReq, temperature: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Enter the minimum or maximum operating temperature</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pressure">Operating Pressure (psi)</Label>
                    <Input
                      id="pressure"
                      type="number"
                      placeholder="e.g., 3000"
                      value={designReq.pressure}
                      onChange={(e) => setDesignReq({ ...designReq, pressure: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Enter the maximum design pressure</p>
                  </div>
                </div>
              )}

              {/* Stage 3: Key Mechanical and Material Properties */}
              {currentStage === 3 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <Activity className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Key Mechanical & Material Properties</h3>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tensileStrength">Minimum Tensile Strength (MPa)</Label>
                    <Input
                      id="tensileStrength"
                      type="number"
                      placeholder="e.g., 485"
                      value={mechProps.tensileStrength}
                      onChange={(e) => setMechProps({ ...mechProps, tensileStrength: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Required minimum tensile strength</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="yieldStrength">Minimum Yield Strength (MPa)</Label>
                    <Input
                      id="yieldStrength"
                      type="number"
                      placeholder="e.g., 170"
                      value={mechProps.yieldStrength}
                      onChange={(e) => setMechProps({ ...mechProps, yieldStrength: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Required minimum yield strength</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hardness">Minimum Hardness (HB)</Label>
                    <Input
                      id="hardness"
                      type="number"
                      placeholder="e.g., 217"
                      value={mechProps.hardness}
                      onChange={(e) => setMechProps({ ...mechProps, hardness: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Required minimum hardness (Brinell)</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="elongation">Minimum Elongation (%)</Label>
                    <Input
                      id="elongation"
                      type="number"
                      placeholder="e.g., 30"
                      value={mechProps.elongation}
                      onChange={(e) => setMechProps({ ...mechProps, elongation: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">Required minimum elongation percentage</p>
                  </div>
                </div>
              )}

              {/* Stage 4: Standard Choosing */}
              {currentStage === 4 && (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Standard Selection</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select the material standards your application must comply with
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id="astm"
                        checked={standards.astm}
                        onCheckedChange={(checked) => setStandards({ ...standards, astm: checked as boolean })}
                      />
                      <label
                        htmlFor="astm"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-semibold">ASTM (American Society for Testing and Materials)</div>
                        <p className="text-xs text-muted-foreground">Widely used in North America</p>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id="iso"
                        checked={standards.iso}
                        onCheckedChange={(checked) => setStandards({ ...standards, iso: checked as boolean })}
                      />
                      <label
                        htmlFor="iso"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-semibold">ISO (International Organization for Standardization)</div>
                        <p className="text-xs text-muted-foreground">Global standard widely recognized</p>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id="en"
                        checked={standards.en}
                        onCheckedChange={(checked) => setStandards({ ...standards, en: checked as boolean })}
                      />
                      <label
                        htmlFor="en"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-semibold">EN (European Norms)</div>
                        <p className="text-xs text-muted-foreground">Required for European markets</p>
                      </label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id="din"
                        checked={standards.din}
                        onCheckedChange={(checked) => setStandards({ ...standards, din: checked as boolean })}
                      />
                      <label
                        htmlFor="din"
                        className="flex-1 cursor-pointer"
                      >
                        <div className="font-semibold">DIN (Deutsches Institut für Normung)</div>
                        <p className="text-xs text-muted-foreground">German engineering standards</p>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStage === 2}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            {currentStage < 4 ? (
              <Button onClick={handleNext} className="gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleRun} className="gap-2 bg-green-600 hover:bg-green-700">
                Run Analysis
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MultiStageMenu;
