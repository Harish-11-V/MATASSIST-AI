import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Database, FileSpreadsheet, FileText, Download, ArrowRight, 
  CheckCircle, Loader2, Table, BookOpen 
} from "lucide-react";

interface MaterialProperty {
  grade: string;
  yield: string;
  tensile: string;
  density: string;
  fatigueStrength: string;
  costIndex: string;
  sustainability: string;
  maxTemp: string;
  minTemp: string;
  tempRange: string;
  corrosionScore: string;
  strength: string;
}

const sampleMaterials: MaterialProperty[] = [
  { grade: "316L SS", yield: "170 MPa", tensile: "485 MPa", density: "8.0 g/cm³", 
    fatigueStrength: "240 MPa", costIndex: "Medium", sustainability: "High", 
    maxTemp: "870°C", minTemp: "-196°C", tempRange: "1066°C", corrosionScore: "9/10", strength: "High" },
  { grade: "9% Ni Steel", yield: "585 MPa", tensile: "690 MPa", density: "7.85 g/cm³", 
    fatigueStrength: "345 MPa", costIndex: "High", sustainability: "Medium", 
    maxTemp: "320°C", minTemp: "-196°C", tempRange: "516°C", corrosionScore: "7/10", strength: "Very High" },
  { grade: "Inconel 625", yield: "414 MPa", tensile: "827 MPa", density: "8.44 g/cm³", 
    fatigueStrength: "414 MPa", costIndex: "Very High", sustainability: "Medium", 
    maxTemp: "982°C", minTemp: "-253°C", tempRange: "1235°C", corrosionScore: "10/10", strength: "Very High" },
  { grade: "Duplex 2205", yield: "450 MPa", tensile: "620 MPa", density: "7.8 g/cm³", 
    fatigueStrength: "310 MPa", costIndex: "Medium-High", sustainability: "High", 
    maxTemp: "315°C", minTemp: "-50°C", tempRange: "365°C", corrosionScore: "8/10", strength: "High" },
];

const processingSteps = [
  { id: 1, label: "Data Ingestion", description: "Reading PDF and preparing for extraction", icon: Database },
  { id: 2, label: "Content Extraction", description: "Extracting text, tables, and material properties", icon: FileText },
  { id: 3, label: "Document Chunking", description: "Splitting content into manageable chunks", icon: Table },
  { id: 4, label: "Vector Embeddings", description: "Generating semantic embeddings with AI", icon: BookOpen },
  { id: 5, label: "Knowledge Base", description: "Storing in vector database for retrieval", icon: Database },
];

const Processing = () => {
  const [searchParams] = useSearchParams();
  const app = searchParams.get('app') || 'cryogenic';
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState<{[key: number]: number}>({});
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const totalSteps = processingSteps.length;
    const stepDuration = 2000;
    
    const interval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= totalSteps) {
          clearInterval(interval);
          setIsComplete(true);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentStep > 0 && currentStep <= processingSteps.length) {
      let progressValue = 0;
      const progressInterval = setInterval(() => {
        progressValue += 5;
        if (progressValue >= 100) {
          progressValue = 100;
          clearInterval(progressInterval);
        }
        setStepProgress(prev => ({ ...prev, [currentStep]: progressValue }));
      }, 40);
      
      return () => clearInterval(progressInterval);
    }
  }, [currentStep]);

  const downloadCSV = () => {
    const headers = ['Grade', 'Yield', 'Tensile', 'Density', 'Fatigue Strength', 
      'Cost Index', 'Sustainability', 'Max Temp', 'Min Temp', 'Temp Range', 
      'Corrosion Score', 'Strength'];
    const csvContent = [
      headers.join(','),
      ...sampleMaterials.map(m => Object.values(m).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'material_properties.csv';
    a.click();
  };

  const downloadRAGDoc = () => {
    const ragContent = sampleMaterials.map(m => `
STANDARD NAME: Material Grade ${m.grade}
GRADE NAME: ${m.grade}

DESCRIPTION:
Material Type: ${m.grade}
Mechanical Properties:
- Yield Strength: ${m.yield}
- Tensile Strength: ${m.tensile}
- Fatigue Strength: ${m.fatigueStrength}

Physical Properties:
- Density: ${m.density}
- Temperature Range: ${m.minTemp} to ${m.maxTemp}

Performance Metrics:
- Corrosion Resistance: ${m.corrosionScore}
- Sustainability Rating: ${m.sustainability}
- Cost Index: ${m.costIndex}

---
`).join('\n');
    
    const blob = new Blob([ragContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rag_material_data.txt';
    a.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 pt-24">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Data Extraction & Processing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transforming your documents into structured material intelligence
          </p>
        </div>

        {/* Processing Pipeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <Loader2 className={`h-6 w-6 text-white ${!isComplete ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <h2 className="text-xl font-bold">RAG Pipeline Processing</h2>
                <p className="text-sm text-muted-foreground">Extracting and vectorizing material data</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {processingSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index + 1 === currentStep;
              const isCompleted = index + 1 < currentStep;
              const progressValue = stepProgress[index + 1] || 0;
              
              return (
                <Card 
                  key={step.id}
                  className={`transition-all duration-500 ${
                    isActive ? 'border-primary shadow-md' : isCompleted ? 'border-green-500' : 'border-border'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                        isCompleted ? 'bg-green-500 text-white' : 
                        isActive ? 'bg-primary/10 border-2 border-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? <CheckCircle className="h-8 w-8" /> : 
                         isActive ? <Loader2 className="h-8 w-8 text-primary animate-spin" /> : 
                         <span className="text-xl font-bold text-muted-foreground">{step.id}</span>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{step.label}</h3>
                          {isActive && (
                            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                              Processing...
                            </span>
                          )}
                          {isCompleted && (
                            <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                              Completed
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                        <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ease-out ${
                              isCompleted ? 'bg-green-500' : 'bg-primary'
                            }`}
                            style={{ width: `${isActive || isCompleted ? (isCompleted ? 100 : progressValue) : 0}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </CardContent>
        </Card>

        {/* Overall Progress */}
        {!isComplete && (
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Overall Progress</span>
                <span className="text-sm font-bold text-primary">{Math.round((currentStep / processingSteps.length) * 100)}%</span>
              </div>
              <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-green-500 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / processingSteps.length) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {isComplete && (
          <div className="animate-fade-in">
            <Tabs defaultValue="structured" className="mb-8">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="structured" className="gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Structured Properties
                </TabsTrigger>
                <TabsTrigger value="rag" className="gap-2">
                  <FileText className="h-4 w-4" />
                  RAG Document
                </TabsTrigger>
              </TabsList>

              <TabsContent value="structured">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Structured Properties Database</CardTitle>
                        <CardDescription>
                          Extracted material properties in tabular format
                        </CardDescription>
                      </div>
                      <Button variant="outline" onClick={downloadCSV} className="gap-2">
                        <Download className="h-4 w-4" />
                        Download CSV
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-semibold text-foreground">Grade</th>
                            <th className="text-left py-3 px-4 font-semibold text-foreground">Yield</th>
                            <th className="text-left py-3 px-4 font-semibold text-foreground">Tensile</th>
                            <th className="text-left py-3 px-4 font-semibold text-foreground">Density</th>
                            <th className="text-left py-3 px-4 font-semibold text-foreground">Corrosion</th>
                            <th className="text-left py-3 px-4 font-semibold text-foreground">Temp Range</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sampleMaterials.map((mat, idx) => (
                            <tr key={idx} className="border-b border-border hover:bg-muted/50">
                              <td className="py-3 px-4 font-medium text-primary">{mat.grade}</td>
                              <td className="py-3 px-4 text-muted-foreground">{mat.yield}</td>
                              <td className="py-3 px-4 text-muted-foreground">{mat.tensile}</td>
                              <td className="py-3 px-4 text-muted-foreground">{mat.density}</td>
                              <td className="py-3 px-4 text-muted-foreground">{mat.corrosionScore}</td>
                              <td className="py-3 px-4 text-muted-foreground">{mat.tempRange}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rag">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>RAG-Friendly Document</CardTitle>
                        <CardDescription>
                          Textual format optimized for Gemini retrieval
                        </CardDescription>
                      </div>
                      <Button variant="outline" onClick={downloadRAGDoc} className="gap-2">
                        <Download className="h-4 w-4" />
                        Download TXT
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg text-sm text-muted-foreground overflow-auto max-h-96 font-mono">
{`STANDARD NAME: Material Grade 316L SS
GRADE NAME: 316L SS

DESCRIPTION:
Material Type: Austenitic Stainless Steel
Mechanical Properties:
- Yield Strength: 170 MPa
- Tensile Strength: 485 MPa
- Fatigue Strength: 240 MPa

Physical Properties:
- Density: 8.0 g/cm³
- Temperature Range: -196°C to 870°C

Performance Metrics:
- Corrosion Resistance: 9/10
- Sustainability Rating: High
- Cost Index: Medium

---

STANDARD NAME: Material Grade 9% Ni Steel
GRADE NAME: 9% Ni Steel

DESCRIPTION:
Material Type: Low-Alloy Steel
Mechanical Properties:
- Yield Strength: 585 MPa
- Tensile Strength: 690 MPa
- Fatigue Strength: 345 MPa

...`}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Continue */}
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline"
                size="lg"
                onClick={() => navigate(`/analytics?app=${app}`)}
                className="gap-2 px-8"
              >
                View Analytics
              </Button>
              <Button 
                size="lg"
                onClick={() => navigate(`/chat?app=${app}`)}
                className="gap-2 px-8"
              >
                Start AI Chat
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Processing;
