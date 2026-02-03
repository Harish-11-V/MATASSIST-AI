import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const A890Demo = () => {
  const navigate = useNavigate();

  const grades = [
    { grade: "1A", type: "25Cr-5Ni-Mo-Cu", uns: "J93370", aci: "CD4MCu" },
    { grade: "1B", type: "25Cr-5Ni-M0-Cu-N", uns: "J93372", aci: "CD4MCuN" },
    { grade: "1C", type: "25Cr-6Ni-Mo-Cu-N", uns: "J93373", aci: "CD3MCuN" },
    { grade: "2A", type: "24Cr-10Ni-Mo-N", uns: "J93345", aci: "CE8MN" },
    { grade: "3A", type: "25Cr-5Ni-Mo-N", uns: "J93371", aci: "CD6MN" },
    { grade: "4A", type: "22Cr-5Ni-Mo-N", uns: "J92205", aci: "CD3MN" },
    { grade: "5A", type: "25Cr-7Ni-Mo-N", uns: "J93404", aci: "CE3MN" },
    { grade: "6A", type: "25Cr-7Ni-Mo-N", uns: "J93380", aci: "CD3MWCuN" }
  ];

  const tensileData = [
    { grade: "1A", type: "25Cr-5Ni-Mo-Cu", tensile: "100 [690]", yield: "70 [485]", elongation: "16" },
    { grade: "2A", type: "24Cr-10Ni-Mo-N", tensile: "95 [655]", yield: "65 [450]", elongation: "25" },
    { grade: "3A", type: "25Cr-5Ni-Mo-N", tensile: "95 [655]", yield: "65 [450]", elongation: "25" },
    { grade: "4A", type: "22Cr-5Ni-Mo-N", tensile: "90 [620]", yield: "60 [415]", elongation: "25" },
    { grade: "5A", type: "25Cr-7Ni-Mo-N", tensile: "100 [690]", yield: "75 [515]", elongation: "18" },
    { grade: "6A", type: "25Cr-7Ni-Mo-N", tensile: "100 [690]", yield: "65 [450]", elongation: "25" },
    { grade: "1B", type: "25Cr-5Ni-Mo-Cu-N", tensile: "100 [690]", yield: "70 [485]", elongation: "16" },
    { grade: "1C", type: "25Cr-6Ni-Mo-Cu-N", tensile: "100 [690]", yield: "65 [450]", elongation: "25" }
  ];

  const heatTreatment = [
    { grade: "1A, 1B, 1C", treatment: "Heat to 1900°F [1040°C] minimum, hold for sufficient time to heat casting uniformly to temperature, quench in water or rapid cool by other means." },
    { grade: "2A", treatment: "Heat to 2050°F [1120°C] minimum, hold for sufficient time to heat casting uniformly to temperature, quench in water or rapid cool by other means." },
    { grade: "3A", treatment: "Heat to 1950°F [1070°C] minimum, hold for sufficient time to heat casting uniformly to temperature, quench in water or rapid cool by other means." },
    { grade: "4A", treatment: "Heat to 2050°F [1120°C] minimum for sufficient time to heat casting uniformly to temperature and water quench, or the casting may be furnace cooled to 1850°F [1010°C] minimum, hold for 15 min minimum and then water quench." },
    { grade: "5A", treatment: "Heat to 2050°F [1120°C] minimum, hold for sufficient time to heat casting to temperature, furnace cool to 1910°F [1045°C] minimum, hold for 3 min minimum and then rapid cool by other" },
    { grade: "6A", treatment: "Heat to 2010°F [1100°C] minimum, hold for sufficient time to heat casting uniformly to temperature, quench in water or cool rapidly by other means." }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12 pt-24">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-8 w-8 text-primary" />
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded">ASTM Standard</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">ASTM A890/A890M</h1>
          <p className="text-xl text-muted-foreground mb-2">
            Standard Specification for Castings, Iron-Chromium-Nickel-Molybdenum Corrosion-Resistant, Duplex (Austenitic/Ferritic) for General Application
          </p>
          <p className="text-sm text-muted-foreground">
            Published October 2003 | Last revision: 1999 as A 890/A 890M ± 99
          </p>
        </div>

        {/* Scope Section */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">1. Scope</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            This specification covers a group of cast duplex stainless steels (austenitic/ferritic). The duplex stainless steel alloys offer a combination of enhanced mechanical properties and corrosion resistance when properly balanced in composition and properly heat treated.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Ferrite levels are not specified, but these alloys will develop a range of approximately 30 to 60% ferrite with the balance austenite.
          </p>
        </Card>

        {/* Grades Overview */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Available Grades</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {grades.map((item, idx) => (
              <div key={idx} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-primary">Grade {item.grade}</h3>
                  <span className="text-xs px-2 py-1 bg-muted rounded">#{idx + 1}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                <div className="space-y-1 text-xs">
                  <div><span className="text-muted-foreground">UNS:</span> <span className="font-medium">{item.uns}</span></div>
                  <div><span className="text-muted-foreground">ACI:</span> <span className="font-medium">{item.aci}</span></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Tensile Requirements */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-6">Tensile Requirements (Table S32.1)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  <th className="text-left p-3 font-semibold">Grade</th>
                  <th className="text-left p-3 font-semibold">Type</th>
                  <th className="text-left p-3 font-semibold">Tensile Strength<br/><span className="text-xs font-normal">ksi [MPa], min</span></th>
                  <th className="text-left p-3 font-semibold">Yield Strength<br/><span className="text-xs font-normal">ksi [MPa], min</span></th>
                  <th className="text-left p-3 font-semibold">Elongation<br/><span className="text-xs font-normal">%, min</span></th>
                </tr>
              </thead>
              <tbody>
                {tensileData.map((row, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50">
                    <td className="p-3 font-medium">{row.grade}</td>
                    <td className="p-3 text-sm text-muted-foreground">{row.type}</td>
                    <td className="p-3 font-semibold text-primary">{row.tensile}</td>
                    <td className="p-3 font-semibold text-primary">{row.yield}</td>
                    <td className="p-3">{row.elongation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Heat Treatment */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">5. Heat Treatment Requirements</h2>
          <p className="text-muted-foreground mb-4">
            Castings shall be heat treated in accordance with the requirements in Table 1.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <p className="text-sm text-blue-900">
              <strong>NOTE:</strong> Proper heat treatment of these alloys is usually necessary to enhance corrosion resistance and in some cases to meet mechanical requirements.
            </p>
          </div>
          <div className="space-y-4">
            {heatTreatment.map((item, idx) => (
              <div key={idx} className="p-4 border border-border rounded-lg">
                <h4 className="font-bold text-primary mb-2">Grade {item.grade}</h4>
                <p className="text-sm text-muted-foreground">{item.treatment}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Referenced Documents */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">2. Referenced ASTM Standards</h2>
          <div className="space-y-2 text-sm">
            <p><strong>A370</strong> - Test Methods and Definitions for Mechanical Testing of Steel Products</p>
            <p><strong>A732/A732M</strong> - Specification for Castings, Investment, Carbon and Low-Alloy Steel for General Application, and Cobalt Alloy for High Strength at Elevated Temperatures</p>
            <p><strong>A781/A781M</strong> - Specification for Castings, Steel and Alloy, Common Requirements, for General Industrial Use</p>
            <p><strong>E 29</strong> - Practice for Using Significant Digits in Test Data to Determine Conformance With Specifications</p>
            <p><strong>E 562</strong> - Practice for Determining Volume Fraction by Systematic Manual Point Count</p>
            <p><strong>E 1245</strong> - Practice for Determining the Inclusion or Second-Phase Constituent Content of Metals by Automatic Image Analysis</p>
          </div>
        </Card>

        {/* Process Information */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">4. Process</h2>
          <p className="text-muted-foreground leading-relaxed">
            The steel shall be made by the electric furnace process with or without separate refining such as argon-oxygen-decarburization (AOD).
          </p>
        </Card>

        {/* Keywords */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">10. Keywords</h2>
          <div className="flex flex-wrap gap-2">
            {["austenite", "duplex stainless steel", "ferrite", "stainless steel", "steel castings"].map((keyword, idx) => (
              <span key={idx} className="px-3 py-1 bg-muted text-foreground text-sm rounded-full border border-border">
                {keyword}
              </span>
            ))}
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
          <Button className="gap-2" onClick={() => window.open('https://www.astm.org/a0890_a0890m-99.html', '_blank')}>
            <ExternalLink className="h-4 w-4" />
            View on ASTM
          </Button>
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground text-center">
            Copyright © ASTM International, 100 Barr Harbor Drive, PO Box C700, West Conshohocken, PA19428-2959, United States.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default A890Demo;
