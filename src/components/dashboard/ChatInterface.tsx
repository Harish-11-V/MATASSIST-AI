import { useState } from "react";
import { Send, Bot, User, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const EXAMPLE_PROMPTS = [
  "Find materials for cryogenic valve applications (-196°C)",
  "Recommend corrosion-resistant steel for oil & gas pipelines",
  "Best material for hygienic food processing equipment",
  "Compare SS316L vs Hastelloy C-276 for subsea use",
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your Material Selection Assistant. I can help you find the optimal materials for your design requirements based on ASTM, DIN, EN, and ISO standards. What application are you designing for?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const normalizeMaterial = (material: string): string => {
    let normalized = material.toLowerCase().trim();
    normalized = normalized.replace(/\bni\b/, 'nickel');
    normalized = normalized.replace(/\s+/g, ' ');
    return normalized;
  };

  const extractMaterials = (content: string): string[] => {
    // First, try to extract Rank 1 material from rankings or tables
    const rank1Patterns = [
      /(?:Rank 1|\|\s*1\s*\|)[:\s]*([A-Za-z0-9\s\-\/]+?)(?:\||\n|\*\*|,)/i,
      /^1\.\s*([A-Za-z0-9\s\-\/]+?)(?:\n|:|\*\*)/m,
      /\*\*1\.\s*([A-Za-z0-9\s\-\/]+?)\*\*/i,
    ];

    for (const pattern of rank1Patterns) {
      const match = content.match(pattern);
      if (match && match[1]) {
        const material = match[1].trim();
        if (material.length > 2 && material.length < 50) {
          return [material];
        }
      }
    }

    // Fallback: Extract materials using comprehensive patterns
    const materialPatterns = [
      /(Zeron\s*\d+)/gi,
      /(Super Duplex\s*(?:SS|Steel)?\s*\d*)/gi,
      /(Duplex\s*\d+)/gi,
      /(\d{3}[A-Z]?\s*(?:stainless steel|steel|SS))/gi,
      /(Inconel\s*\d+)/gi,
      /(Monel\s*\d+)/gi,
      /(Hastelloy\s*[A-Z]-?\d*)/gi,
      /(\d+%?\s*Ni(?:ckel)?\s*(?:Steel)?)/gi,
      /(Titanium\s*Grade\s*\d+)/gi,
      /(Carbon\s*Steel)/gi,
      /(Low\s*Carbon\s*Steel)/gi,
      /(Aluminum\s*Alloy\s*\d+)/gi,
      /(SS\d{3}[A-Z]?)/gi,
    ];

    const materialsMap = new Map<string, string>();
    materialPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const trimmed = match.trim();
          const normalized = normalizeMaterial(trimmed);
          if (!materialsMap.has(normalized)) {
            materialsMap.set(normalized, trimmed);
          }
        });
      }
    });

    return Array.from(materialsMap.values()).slice(0, 1); // Return only top material
  };

  const addRankingMedals = (content: string): string => {
    let enhanced = content;
    
    // Add medals to "Rank 1", "Rank 2", "Rank 3" patterns
    enhanced = enhanced.replace(/\bRank 1\b/gi, '🥇 Rank 1');
    enhanced = enhanced.replace(/\bRank 2\b/gi, '🥈 Rank 2');
    enhanced = enhanced.replace(/\bRank 3\b/gi, '🥉 Rank 3');
    
    // Add medals to table cells starting with 1, 2, 3
    enhanced = enhanced.replace(/(\|\s*)1(\s*\|)/g, '$1🥇 1$2');
    enhanced = enhanced.replace(/(\|\s*)2(\s*\|)/g, '$1🥈 2$2');
    enhanced = enhanced.replace(/(\|\s*)3(\s*\|)/g, '$1🥉 3$2');
    
    // Add medals to numbered lists
    enhanced = enhanced.replace(/^1\./gm, '🥇 1.');
    enhanced = enhanced.replace(/^2\./gm, '🥈 2.');
    enhanced = enhanced.replace(/^3\./gm, '🥉 3.');
    
    return enhanced;
  };



  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Based on your query "${input}", I've analyzed our material database and standards. Here are my recommendations:\n\n### Material Ranking for Your Application\n\n| Rank | Material | Primary Strength | Key Properties |\n|------|----------|------------------|----------------|\n| 1 | 316L Stainless Steel | Corrosion Resistance | Tensile: 485 MPa, Yield: 170 MPa, ASTM A240 |\n| 2 | Inconel 625 | High Temperature | Temp Range: -253°C to 1093°C, Yield: 415 MPa |\n| 3 | Duplex 2205 | Strength + Corrosion | Yield: 450-550 MPa, Marine applications |\n\nThese materials are ranked based on suitability for your requirements, availability, and cost-effectiveness.`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleExampleClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3 text-foreground">AI Material Advisor</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Describe your design requirements and let our AI find the perfect materials from global standards.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto overflow-hidden shadow-elevated border-border">
          {/* Chat header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-card">
            <div className="relative">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Material Assistant</h3>
              <p className="text-xs text-muted-foreground">RAG-powered • ASTM, DIN, EN, ISO</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[400px] overflow-y-auto p-6 space-y-6 bg-card">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-slide-up",
                  message.role === "user" && "flex-row-reverse"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    message.role === "assistant"
                      ? "bg-primary"
                      : "bg-accent/10 text-accent"
                  )}
                >
                  {message.role === "assistant" ? (
                    <img 
                      src="/lt-logo.png" 
                      alt="L&T" 
                      className="h-5 w-5 object-contain brightness-110 contrast-125"
                      style={{ imageRendering: 'crisp-edges' }}
                    />
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "rounded-xl px-4 py-3 max-w-[80%]",
                    message.role === "assistant"
                      ? "bg-muted text-foreground"
                      : "bg-primary text-primary-foreground"
                  )}
                >
                  {message.role === "assistant" ? (
                    <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-h1:mb-3 prose-h2:mb-2 prose-h3:mb-2 prose-h1:mt-4 prose-h2:mt-3 prose-h3:mt-2 prose-p:my-2 prose-p:leading-relaxed prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-strong:font-bold prose-strong:text-foreground prose-table:border-collapse prose-table:w-full prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:p-2 prose-th:font-semibold prose-td:border prose-td:border-border prose-td:p-2 prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{addRankingMedals(message.content)}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 animate-slide-up">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Loader2 className="h-4 w-4 text-primary animate-spin" />
                </div>
                <div className="bg-muted rounded-xl px-4 py-3">
                  <p className="text-sm text-muted-foreground">Analyzing materials database...</p>
                </div>
              </div>
            )}
          </div>

          {/* Example prompts */}
          {messages.length === 1 && (
            <div className="px-6 pb-4 bg-card">
              <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(prompt)}
                    className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors border border-border"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Describe your material requirements..."
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isLoading} className="bg-primary hover:bg-primary/90">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
