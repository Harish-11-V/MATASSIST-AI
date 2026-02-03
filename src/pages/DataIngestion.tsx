import { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, FileText, FileSpreadsheet, File, X, CheckCircle, 
  ArrowRight, AlertCircle, Loader2 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RAGProcessingSteps } from "@/components/RAGProcessingSteps";

// UUID generator fallback for browsers that don't support crypto.randomUUID
const generateUUID = (): string => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback UUID v4 generator
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'processing' | 'complete' | 'error';
  progress: number;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const getFileIcon = (type: string) => {
  if (type.includes('pdf')) return <FileText className="h-5 w-5 text-destructive" />;
  if (type.includes('csv') || type.includes('spreadsheet') || type.includes('excel')) 
    return <FileSpreadsheet className="h-5 w-5 text-success" />;
  return <File className="h-5 w-5 text-primary" />;
};

const DataIngestion = () => {
  const [searchParams] = useSearchParams();
  const app = searchParams.get('app') || 'cryogenic';
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showRAGAnimation, setShowRAGAnimation] = useState(false);
  const [ragComplete, setRagComplete] = useState(false);

  // 🔥 CRITICAL FIX: Clear old data when component mounts (user returning to upload page)
  useEffect(() => {
    console.log('🧹 DataIngestion page loaded - clearing old upload data...');
    sessionStorage.removeItem('uploadedFiles');
    sessionStorage.removeItem('extractedMaterials');
    sessionStorage.removeItem('structuredData');
    sessionStorage.removeItem('rawText');
    console.log('✅ Old upload data cleared - ready for fresh upload');
  }, []);

  const appLabels: Record<string, string> = {
    cryogenic: 'Cryogenic Applications',
    subsea: 'Subsea Applications',
    'oil-gas': 'Oil & Gas Applications'
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = (file: File): UploadedFile | null => {
    const allowedTypes = ['text/plain', 'text/csv', 'application/pdf', 
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const maxSize = 200 * 1024 * 1024; // 200MB

    if (!allowedTypes.some(t => file.type.includes(t.split('/')[1]) || file.name.endsWith('.txt') || file.name.endsWith('.csv') || file.name.endsWith('.pdf'))) {
      toast({
        title: "Invalid file type",
        description: "Please upload TXT, CSV, or PDF files only.",
        variant: "destructive"
      });
      return null;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Maximum file size is 200MB.",
        variant: "destructive"
      });
      return null;
    }

    return {
      id: generateUUID(),
      name: file.name,
      size: file.size,
      type: file.type || file.name.split('.').pop() || 'unknown',
      status: 'uploading',
      progress: 0
    };
  };

  const simulateUpload = async (fileId: string, actualFile: File) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, status: 'processing', progress: 100 } : f
        ));
        // Store file for RAG processing
        setTimeout(async () => {
          try {
            // Convert file to base64 for session storage
            const base64 = await fileToBase64(actualFile);
            const existingFiles = JSON.parse(sessionStorage.getItem('uploadedFiles') || '[]');
            existingFiles.push({
              name: actualFile.name,
              type: actualFile.type,
              size: actualFile.size,
              data: base64,
            });
            sessionStorage.setItem('uploadedFiles', JSON.stringify(existingFiles));
            
            setFiles(prev => prev.map(f => 
              f.id === fileId ? { ...f, status: 'complete' } : f
            ));

            // Trigger RAG animation after file upload completes
            setShowRAGAnimation(true);
          } catch (error) {
            console.error('File storage error:', error);
            setFiles(prev => prev.map(f => 
              f.id === fileId ? { ...f, status: 'error' } : f
            ));
          }
        }, 1500);
      } else {
        setFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      }
    }, 200);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach(file => {
      const processedFile = processFile(file);
      if (processedFile) {
        setFiles(prev => [...prev, processedFile]);
        simulateUpload(processedFile.id, file);
      }
    });
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(file => {
        const processedFile = processFile(file);
        if (processedFile) {
          setFiles(prev => [...prev, processedFile]);
          simulateUpload(processedFile.id, file);
        }
      });
    }
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleContinue = () => {
    if (files.some(f => f.status === 'complete')) {
      // Navigate to multi-stage menu for additional requirements
      navigate(`/multi-stage-menu?app=${app}`);
    }
  };

  const completedFiles = files.filter(f => f.status === 'complete').length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 pt-24">
        {/* Header */}
        <div className="text-center mb-12 animate-slide-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            {appLabels[app]}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Data Ingestion
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your material standards, specifications, and technical documents. 
            Supported formats: TXT, CSV, PDF (max 200MB per file).
          </p>
        </div>

        {/* RAG Processing Animation - Shows after file upload */}
        {showRAGAnimation && !ragComplete && (
          <div className="mb-8">
            <RAGProcessingSteps 
              isProcessing={true}
              onComplete={() => {
                console.log('✅ RAG vectorization complete');
                setRagComplete(true);
                setShowRAGAnimation(false);
                toast({
                  title: "✅ Vectorization Complete",
                  description: "Documents processed and ready for analysis",
                });
              }}
            />
          </div>
        )}

        {/* Upload Zone */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>
              Drag and drop files or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all ${
                isDragging 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {isDragging ? 'Drop files here' : 'Drag & drop files here'}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse from your computer
              </p>
              <input
                type="file"
                multiple
                accept=".txt,.csv,.pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button asChild variant="outline">
                <label htmlFor="file-upload" className="cursor-pointer">
                  Browse Files
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* File List */}
        {files.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Uploaded Files</span>
                <span className="text-sm font-normal text-muted-foreground">
                  {completedFiles} of {files.length} processed
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {files.map(file => (
                  <div 
                    key={file.id}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    {getFileIcon(file.type)}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                      {file.status === 'uploading' && (
                        <Progress value={file.progress} className="h-1 mt-2" />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {file.status === 'uploading' && (
                        <span className="text-sm text-muted-foreground">
                          {Math.round(file.progress)}%
                        </span>
                      )}
                      {file.status === 'processing' && (
                        <span className="flex items-center gap-1 text-sm text-warning">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Processing
                        </span>
                      )}
                      {file.status === 'complete' && (
                        <span className="flex items-center gap-1 text-sm text-success">
                          <CheckCircle className="h-4 w-4" />
                          Complete
                        </span>
                      )}
                      {file.status === 'error' && (
                        <span className="flex items-center gap-1 text-sm text-destructive">
                          <AlertCircle className="h-4 w-4" />
                          Error
                        </span>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => removeFile(file.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Continue Button */}
        <div className="flex justify-center">
          <Button 
            size="lg"
            onClick={handleContinue}
            disabled={completedFiles === 0 || showRAGAnimation}
            className="gap-2 px-8"
          >
            {ragComplete ? 'Continue to Analysis' : 'Process & Extract Data'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DataIngestion;