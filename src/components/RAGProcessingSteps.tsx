import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from 'lucide-react';

interface RAGStep {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
}

interface RAGProcessingStepsProps {
  isProcessing: boolean;
  onComplete?: () => void;
}

export const RAGProcessingSteps = ({ isProcessing, onComplete }: RAGProcessingStepsProps) => {
  const [steps, setSteps] = useState<RAGStep[]>([
    {
      id: 'ingestion',
      label: 'Data Ingestion',
      description: 'Reading PDF and preparing for extraction',
      status: 'pending',
    },
    {
      id: 'extraction',
      label: 'Content Extraction',
      description: 'Extracting text, tables, and material properties',
      status: 'pending',
    },
    {
      id: 'chunking',
      label: 'Document Chunking',
      description: 'Splitting content into manageable chunks',
      status: 'pending',
    },
    {
      id: 'embedding',
      label: 'Vector Embeddings',
      description: 'Generating semantic embeddings with AI',
      status: 'pending',
    },
    {
      id: 'storage',
      label: 'Knowledge Base',
      description: 'Storing in vector database for retrieval',
      status: 'pending',
    },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(-1);

  useEffect(() => {
    if (!isProcessing) {
      setCurrentStepIndex(-1);
      setSteps(prev => prev.map(step => ({ ...step, status: 'pending' })));
      return;
    }

    // Simulate processing steps
    let stepIndex = 0;
    const processNextStep = () => {
      if (stepIndex >= steps.length) {
        // All steps completed
        setTimeout(() => {
          onComplete?.();
        }, 500);
        return;
      }

      setCurrentStepIndex(stepIndex);

      // Mark current step as processing
      setSteps(prev => prev.map((step, idx) => {
        if (idx === stepIndex) {
          return { ...step, status: 'processing' };
        }
        return step;
      }));

      // Simulate processing time (different for each step)
      const processingTimes = [800, 1500, 1000, 1800, 1200]; // ms for each step
      
      setTimeout(() => {
        // Mark current step as completed
        setSteps(prev => prev.map((step, idx) => {
          if (idx === stepIndex) {
            return { ...step, status: 'completed' };
          }
          return step;
        }));

        stepIndex++;
        setTimeout(processNextStep, 400); // Small delay before next step
      }, processingTimes[stepIndex]);
    };

    processNextStep();
  }, [isProcessing]);

  if (!isProcessing && currentStepIndex === -1) {
    return null;
  }

  return (
    <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Loader2 className="h-6 w-6 text-white animate-spin" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full blur opacity-40 animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">RAG Pipeline Processing</h3>
              <p className="text-sm text-gray-600">Extracting and vectorizing material data</p>
            </div>
          </div>

          <div className="space-y-3">
            {steps.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isCompleted = step.status === 'completed';
              const isPending = step.status === 'pending';
              const isProcessing = step.status === 'processing';

              return (
                <div key={step.id} className="relative">
                  {/* Progress Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200">
                      <div
                        className={`w-full bg-gradient-to-b from-green-500 to-green-600 transition-all duration-500 ${
                          isCompleted ? 'h-full' : 'h-0'
                        }`}
                      ></div>
                    </div>
                  )}

                  {/* Step Card */}
                  <div
                    className={`relative flex items-start gap-4 p-4 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-blue-100 border-2 border-blue-400 shadow-lg scale-105'
                        : isCompleted
                        ? 'bg-green-50 border-2 border-green-400'
                        : 'bg-white border-2 border-gray-200'
                    }`}
                  >
                    {/* Step Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                      {isCompleted ? (
                        <div className="relative">
                          <CheckCircle2 className="h-12 w-12 text-green-500 animate-in zoom-in duration-300" />
                          <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-40 animate-pulse"></div>
                        </div>
                      ) : isProcessing ? (
                        <div className="relative">
                          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                          <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-30 animate-pulse"></div>
                        </div>
                      ) : (
                        <div className="w-12 h-12 border-4 border-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-gray-400 font-semibold text-lg">{index + 1}</span>
                        </div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h4
                          className={`text-lg font-semibold transition-colors ${
                            isActive
                              ? 'text-blue-700'
                              : isCompleted
                              ? 'text-green-700'
                              : 'text-gray-500'
                          }`}
                        >
                          {step.label}
                        </h4>
                        {isProcessing && (
                          <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded-full animate-pulse">
                            Processing...
                          </span>
                        )}
                        {isCompleted && (
                          <span className="px-2 py-1 text-xs bg-green-600 text-white rounded-full">
                            ✓ Complete
                          </span>
                        )}
                      </div>
                      <p
                        className={`text-sm mt-1 transition-colors ${
                          isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                        }`}
                      >
                        {step.description}
                      </p>

                      {/* Progress Bar for Active Step */}
                      {isProcessing && (
                        <div className="mt-3 w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-shimmer-bar"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Overall Progress Bar */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">Overall Progress</span>
              <span className="text-sm font-semibold text-blue-600">
                {Math.round(((currentStepIndex + 1) / steps.length) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-indigo-600 to-green-500 rounded-full transition-all duration-500 ease-out relative overflow-hidden"
                style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
