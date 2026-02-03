import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart3, 
  MessageSquare, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Sparkles,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";

const quickAccessItems = [
  {
    title: "Applications Explorer",
    description: "Browse material applications across industries like Oil & Gas, Aerospace, Marine, and Chemical Processing",
    icon: Layers,
    color: "bg-blue-500",
    path: "/app-selection",
    stats: "50+ Industries",
    gradient: "from-blue-500/10 to-blue-600/5",
  },
  {
    title: "Analytics Dashboard",
    description: "View material usage trends, performance metrics, and comparative analysis with interactive charts",
    icon: BarChart3,
    color: "bg-purple-500",
    path: "/analytics",
    stats: "Real-time Data",
    gradient: "from-purple-500/10 to-purple-600/5",
  },
  {
    title: "AI Material Advisor",
    description: "Get instant recommendations powered by RAG technology and global material standards database",
    icon: Sparkles,
    color: "bg-emerald-500",
    path: "/chat",
    stats: "24/7 Available",
    gradient: "from-emerald-500/10 to-emerald-600/5",
  },
];

function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isVisible]);

  return (
    <div ref={counterRef} className="text-2xl md:text-3xl font-bold text-foreground">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function QuickAccessSection() {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background via-muted/20 to-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Explore Our Platform
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto">
            Access powerful tools designed to streamline your material selection process
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-20">
          {quickAccessItems.map((item, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border-border hover:border-primary/50 transition-all duration-500 hover:shadow-2xl cursor-pointer transform hover:scale-105"
              onClick={() => navigate(item.path)}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <CardContent className="relative p-8 space-y-6">
                <div className="flex items-start justify-between">
                  <div className={`${item.color} p-4 rounded-2xl text-white shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <item.icon className="h-8 w-8" />
                  </div>
                  <span className="text-sm font-semibold px-4 py-2 rounded-full bg-muted text-muted-foreground border border-border">
                    {item.stats}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-base text-muted-foreground leading-relaxed min-h-[60px]">
                    {item.description}
                  </p>
                </div>

                <Button 
                  variant="ghost" 
                  size="lg"
                  className="w-full justify-between group-hover:bg-primary/10 group-hover:text-primary transition-all duration-300 text-base"
                >
                  <span className="font-semibold">Explore</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Quick Stats with Animations */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 group hover:scale-110 transition-transform duration-300">
            <div className="flex justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <div className="p-3 rounded-xl bg-primary/10">
                <Database className="h-10 w-10 text-primary" />
              </div>
            </div>
            <AnimatedCounter end={10000} suffix="+" />
            <p className="text-sm md:text-base text-muted-foreground mt-2 font-medium">Materials</p>
          </div>
          <div className="text-center p-6 group hover:scale-110 transition-transform duration-300">
            <div className="flex justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <div className="p-3 rounded-xl bg-primary/10">
                <TrendingUp className="h-10 w-10 text-primary" />
              </div>
            </div>
            <AnimatedCounter end={95} suffix="%" />
            <p className="text-sm md:text-base text-muted-foreground mt-2 font-medium">Accuracy</p>
          </div>
          <div className="text-center p-6 group hover:scale-110 transition-transform duration-300">
            <div className="flex justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <div className="p-3 rounded-xl bg-primary/10">
                <Layers className="h-10 w-10 text-primary" />
              </div>
            </div>
            <AnimatedCounter end={50} suffix="+" />
            <p className="text-sm md:text-base text-muted-foreground mt-2 font-medium">Industries</p>
          </div>
          <div className="text-center p-6 group hover:scale-110 transition-transform duration-300">
            <div className="flex justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
              <div className="p-3 rounded-xl bg-primary/10">
                <MessageSquare className="h-10 w-10 text-primary" />
              </div>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-foreground">24/7</div>
            <p className="text-sm md:text-base text-muted-foreground mt-2 font-medium">AI Support</p>
          </div>
        </div>
      </div>
    </section>
  );
}
