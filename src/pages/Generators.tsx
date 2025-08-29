import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy, 
  Download, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  FileText,
  List,
  Send
} from "lucide-react";

const Generators = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedArtifacts, setGeneratedArtifacts] = useState({
    masterPrompt: "",
    microPrompts: [],
    criticChecklist: [],
    handoffBundle: ""
  });

  const generateArtifacts = async () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setGeneratedArtifacts({
        masterPrompt: `# Lovable Master Prompt - E-commerce Website

## Mission
Build a modern e-commerce platform that increases conversions through clear UX and trustworthy design patterns. Focus on product discovery, seamless checkout, and trust-building elements.

## Brand & Design System
- **Primary Color**: #3B82F6 (Professional Blue)
- **Accent Color**: #10B981 (Success Green) 
- **Typography**: Inter for headers and body
- **Voice**: Professional, friendly, trustworthy

## Core Features
1. **Product Catalog** (High Priority)
   - Browse and search products
   - Filter by category, price, ratings
   - Product detail pages with images, specs, reviews

2. **Shopping Cart** (High Priority)
   - Add/remove items
   - Quantity adjustments
   - Secure checkout flow

## Technical Requirements
- Responsive design (mobile-first)
- Fast loading times (<3s)
- Accessibility (WCAG AA)
- SEO optimized

## Quality Gates
- [ ] All core features functional
- [ ] Mobile responsive
- [ ] Accessibility tested
- [ ] Performance optimized`,
        
        microPrompts: [
          "Create a hero section with product showcase and clear value proposition",
          "Build a product grid with filtering and search functionality", 
          "Design a shopping cart component with quantity controls",
          "Implement a checkout flow with form validation",
          "Add customer testimonials section for trust building"
        ],
        
        criticChecklist: [
          "Product images load quickly and are optimized",
          "Cart persists across page refreshes", 
          "Checkout form has proper validation",
          "Mobile navigation is touch-friendly",
          "Trust signals are prominently displayed",
          "Loading states provide user feedback",
          "Error messages are helpful and actionable"
        ],
        
        handoffBundle: `{
  "knowledge": {
    "brand_voice": "professional, friendly, trustworthy",
    "primary_color": "#3B82F6",
    "accent_color": "#10B981", 
    "typography": "Inter",
    "key_features": ["product_catalog", "shopping_cart", "checkout"],
    "target_audience": "online shoppers seeking trustworthy retailers"
  },
  "delivery": {
    "timeline": "5-7 days",
    "milestones": ["design_system", "core_features", "testing", "optimization"],
    "handoff_format": "Lovable project with documentation"
  }
}`
      });
      setIsGenerating(false);
    }, 2500);
  };

  const promptLintChecks = [
    { name: "Mission clarity", status: "pass", description: "Clear project mission defined" },
    { name: "Technical specificity", status: "pass", description: "Specific technical requirements" },
    { name: "Brand consistency", status: "pass", description: "Consistent brand elements" },
    { name: "Quality gates", status: "warning", description: "Some quality criteria could be more specific" },
    { name: "Scope boundaries", status: "pass", description: "Clear feature prioritization" }
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Artifact Generators</h1>
            <p className="text-muted-foreground">
              Generate production-ready prompts and documentation from your config
            </p>
          </div>
          <Button 
            onClick={generateArtifacts}
            disabled={isGenerating}
            className="bg-gradient-primary hover:opacity-90"
          >
            <Zap className="w-5 h-5 mr-2" />
            {isGenerating ? "Generating..." : "Generate All"}
          </Button>
        </div>

        {/* Generator Tabs */}
        <Tabs defaultValue="master" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="master" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Master Prompt
            </TabsTrigger>
            <TabsTrigger value="micro" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Micro-Prompts
            </TabsTrigger>
            <TabsTrigger value="critic" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              QA Checklist
            </TabsTrigger>
            <TabsTrigger value="handoff" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              LPS Handoff
            </TabsTrigger>
          </TabsList>

          <TabsContent value="master" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Lovable Master Prompt (LPS v2.1)</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              
              {generatedArtifacts.masterPrompt ? (
                <div className="bg-surface border rounded-lg p-4">
                  <pre className="text-sm whitespace-pre-wrap font-mono">
                    {generatedArtifacts.masterPrompt}
                  </pre>
                </div>
              ) : (
                <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Master prompt will appear here after generation
                  </p>
                </div>
              )}
            </Card>

            {/* Prompt Lint Results */}
            <Card className="p-6">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-accent" />
                Prompt-Lint Quality Check
              </h4>
              <div className="space-y-3">
                {promptLintChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-surface rounded-lg">
                    <div className="flex items-center gap-3">
                      {check.status === "pass" ? (
                        <CheckCircle className="w-5 h-5 text-accent" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-warning" />
                      )}
                      <div>
                        <p className="font-medium">{check.name}</p>
                        <p className="text-sm text-muted-foreground">{check.description}</p>
                      </div>
                    </div>
                    <Badge variant={check.status === "pass" ? "default" : "secondary"}>
                      {check.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="micro" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Micro-Prompts</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {generatedArtifacts.microPrompts.length > 0 ? (
                <div className="space-y-3">
                  {generatedArtifacts.microPrompts.map((prompt, index) => (
                    <Card key={index} className="p-4 bg-surface">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              Task {index + 1}
                            </Badge>
                          </div>
                          <p className="text-sm">{prompt}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <List className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Micro-prompts will appear here after generation
                  </p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="critic" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Quality Assurance Checklist</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {generatedArtifacts.criticChecklist.length > 0 ? (
                <div className="space-y-2">
                  {generatedArtifacts.criticChecklist.map((check, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                      <div className="w-5 h-5 border-2 border-border rounded"></div>
                      <span className="flex-1 text-sm">{check}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    QA checklist will appear here after generation
                  </p>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="handoff" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Lovable Project Handoff</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Bundle
                  </Button>
                  <Button className="bg-gradient-accent hover:opacity-90">
                    <Send className="w-4 h-4 mr-2" />
                    Send to Lovable
                  </Button>
                </div>
              </div>

              {generatedArtifacts.handoffBundle ? (
                <div className="space-y-4">
                  <div className="bg-accent-subtle p-4 rounded-lg">
                    <h4 className="font-medium text-accent mb-2">Ready for Handoff</h4>
                    <p className="text-sm text-accent/80">
                      Complete project bundle with Knowledge YAML and delivery specifications ready for Lovable.
                    </p>
                  </div>
                  
                  <div className="bg-surface border rounded-lg p-4">
                    <pre className="text-sm whitespace-pre-wrap font-mono">
                      {generatedArtifacts.handoffBundle}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Send className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Handoff bundle will appear here after generation
                  </p>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Generators;