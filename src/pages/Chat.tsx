import { useState, useRef, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2, ExternalLink, ThumbsUp, ThumbsDown, Copy, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  materials?: string[];
}

const CHAT_STORAGE_KEY = 'material_assistant_chat_history';

const suggestedQuestions = [
  "What is the best material for cryogenic LNG storage tanks?",
  "Compare 316L SS vs Inconel 625 for subsea applications",
  "What are the NACE MR0175 requirements for sour service?",
  "Recommend materials for -196°C operating temperature",
];

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/matbot-chat`;

const Chat = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const app = searchParams.get('app') || 'cryogenic';
  const { toast } = useToast();
  
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      {
        id: '1',
        role: 'assistant',
        content: `Welcome to MatBOT AI! I'm your intelligent material selection assistant for ${app.replace('-', ' ')} applications. I can help you with:\n\n• Material recommendations based on your requirements\n• Property comparisons and trade-offs\n• Standard specifications (ASTM, DIN, EN, ISO)\n• Application-specific guidance\n\nHow can I assist you today?`,
      }
    ];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const normalizeMaterial = (material: string): string => {
    // Normalize to lowercase and standardize variations
    let normalized = material.toLowerCase().trim();
    // Standardize Ni/Nickel variations
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
      // Super duplex and duplex steels
      /(Zeron\s*\d+)/gi,
      /(Super Duplex\s*(?:SS|Steel)?\s*\d*)/gi,
      /(Duplex\s*\d+)/gi,
      // Standard stainless steels
      /(\d{3}[A-Z]?\s*(?:stainless steel|steel|SS))/gi,
      // Nickel alloys
      /(Inconel\s*\d+)/gi,
      /(Monel\s*\d+)/gi,
      /(Hastelloy\s*[A-Z]-?\d*)/gi,
      /(\d+%?\s*Ni(?:ckel)?\s*(?:Steel)?)/gi,
      // Titanium
      /(Titanium\s*Grade\s*\d+)/gi,
      // Carbon steels
      /(Carbon\s*Steel)/gi,
      /(Low\s*Carbon\s*Steel)/gi,
      // Aluminum
      /(Aluminum\s*Alloy\s*\d+)/gi,
      /(Al\s*\d+)/gi,
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
    
    // Add medals to table cells starting with 1, 2, 3 (for markdown tables)
    enhanced = enhanced.replace(/(\|\s*)1(\s*\|)/g, '$1🥇 1$2');
    enhanced = enhanced.replace(/(\|\s*)2(\s*\|)/g, '$1🥈 2$2');
    enhanced = enhanced.replace(/(\|\s*)3(\s*\|)/g, '$1🥉 3$2');
    
    // Add medals to numbered lists (1., 2., 3. at start of line)
    enhanced = enhanced.replace(/^1\./gm, '🥇 1.');
    enhanced = enhanced.replace(/^2\./gm, '🥈 2.');
    enhanced = enhanced.replace(/^3\./gm, '🥉 3.');
    
    return enhanced;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: crypto.randomUUID(), role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    let assistantContent = "";
    const assistantId = crypto.randomUUID();

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ 
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          application: app 
        }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error("Failed to connect to AI");
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let idx;
        while ((idx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 1);
          if (!line.startsWith("data: ")) continue;
          const json = line.slice(6).trim();
          if (json === "[DONE]") break;
          try {
            const parsed = JSON.parse(json);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantContent += content;
              const materials = extractMaterials(assistantContent);
              
              setMessages(prev => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && last.id === assistantId) {
                  return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent, materials } : m);
                }
                return [...prev, { id: assistantId, role: "assistant", content: assistantContent, materials }];
              });
            }
          } catch {}
        }
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to get AI response", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast({ title: "Copied to clipboard" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 pt-20 flex flex-col overflow-hidden">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">MatBOT AI Assistant</h1>
          <p className="text-sm text-muted-foreground">RAG-powered material intelligence • Gemini AI</p>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden min-h-0">
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                      <img 
                        src="/lt-logo.png" 
                        alt="L&T" 
                        className="h-5 w-5 object-contain brightness-110 contrast-125"
                        style={{ imageRendering: 'crisp-edges' }}
                      />
                    </div>
                  )}
                  <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                    <div className={`rounded-2xl px-4 py-3 ${message.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-muted text-foreground rounded-tl-sm'}`}>
                      {message.role === 'assistant' ? (
                        <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-bold prose-headings:text-foreground prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-h1:mb-3 prose-h2:mb-2 prose-h3:mb-2 prose-h1:mt-4 prose-h2:mt-3 prose-h3:mt-2 prose-p:my-2 prose-p:leading-relaxed prose-ul:my-2 prose-ol:my-2 prose-li:my-1 prose-strong:font-bold prose-strong:text-foreground prose-table:border-collapse prose-table:w-full prose-th:border prose-th:border-border prose-th:bg-muted/50 prose-th:p-2 prose-th:font-semibold prose-td:border prose-td:border-border prose-td:p-2 prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>{addRankingMedals(message.content)}</ReactMarkdown>
                        </div>
                      ) : (
                        <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                      )}
                    </div>
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mt-2">
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(message.content, message.id)}>
                          {copiedId === message.id ? <CheckCircle className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><ThumbsUp className="h-3.5 w-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7"><ThumbsDown className="h-3.5 w-3.5" /></Button>
                        <div className="flex-1" />
                        <a 
                          href={`https://www.google.com/search?q=${encodeURIComponent((message.materials?.[0] || message.content.slice(0, 100)) + ' material properties')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                        >
                          Google <ExternalLink className="h-3 w-3" />
                        </a>
                        <span className="text-muted-foreground">•</span>
                        <a 
                          href={`https://scholar.google.com/scholar?q=${encodeURIComponent((message.materials?.[0] || message.content.slice(0, 100)) + ' material properties research')}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                        >
                          Scholar <ExternalLink className="h-3 w-3" />
                        </a>
                        <span className="text-muted-foreground">•</span>
                        <a 
                          href={`https://www.matweb.com/search/QuickText.aspx?SearchText=${encodeURIComponent(message.materials?.[0] || message.content.slice(0, 50))}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                        >
                          MatWeb <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <img 
                        src="/lt-logo.png" 
                        alt="L&T" 
                        className="h-5 w-5 object-contain brightness-110 contrast-125"
                        style={{ imageRendering: 'crisp-edges' }}
                      />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, idx) => (
                  <Button key={idx} variant="outline" size="sm" className="text-xs h-auto py-1.5" onClick={() => setInput(q)}>{q}</Button>
                ))}
              </div>
            </div>
          )}

          <CardContent className="border-t border-border p-4">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about materials, standards, or properties..." className="flex-1" disabled={isLoading} />
              <Button type="submit" disabled={!input.trim() || isLoading}><Send className="h-4 w-4" /></Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Chat;