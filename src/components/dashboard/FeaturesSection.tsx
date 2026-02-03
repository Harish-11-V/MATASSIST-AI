import { Card, CardContent } from "@/components/ui/card";
import { 
  Database, 
  MessageSquare, 
  FileCheck, 
  TrendingUp, 
  Shield, 
  Recycle,
  BookOpen,
  Cpu
} from "lucide-react";

const FEATURES = [
  {
    icon: Cpu,
    title: "RAG-Powered AI",
    description: "Retrieval-augmented generation for accurate, context-aware material recommendations from standards literature.",
  },
  {
    icon: Database,
    title: "Comprehensive Database",
    description: "Access 10,000+ materials from ASTM, DIN, EN, and ISO standards with detailed property data.",
  },
  {
    icon: MessageSquare,
    title: "Natural Language Queries",
    description: "Describe requirements in plain English and get intelligent material matches instantly.",
  },
  {
    icon: FileCheck,
    title: "Standards Compliance",
    description: "Automatic verification against relevant standards with traceability documentation.",
  },
  {
    icon: TrendingUp,
    title: "Performance Prediction",
    description: "Simulate material behavior under various operating conditions with historical data.",
  },
  {
    icon: Recycle,
    title: "Sustainability Scoring",
    description: "Environmental impact analysis and lifecycle assessment for eco-friendly choices.",
  },
  {
    icon: Shield,
    title: "Expert Validation",
    description: "AI recommendations validated against expert decision history and best practices.",
  },
  {
    icon: BookOpen,
    title: "Export Reports",
    description: "Generate detailed specification reports for documentation and procurement.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3 text-foreground">Engineering Intelligence</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Combining advanced AI with engineering expertise to accelerate your material selection process
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, index) => (
            <Card 
              key={index} 
              className="group bg-card border-border shadow-card hover:shadow-elevated transition-all duration-300"
            >
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}