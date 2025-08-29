import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, 
  Play, 
  AlertCircle, 
  CheckCircle, 
  Settings,
  FileText,
  Eye
} from "lucide-react";

const ConfigEditor = () => {
  const [isValidating, setIsValidating] = useState(false);
  const [validationErrors] = useState([
    { line: 12, message: "Missing required field: project.domain" },
    { line: 23, message: "Invalid color format in brand.primary" }
  ]);

  const sampleYaml = `# Prompt Forge Configuration
project:
  name: "E-commerce Website"
  domain: "mystore.com"
  description: "Modern e-commerce platform"
  primary_goal: "Increase conversions"

brand:
  voice:
    tone: "professional, friendly, trustworthy"
    style: "clear, concise, benefit-focused"
  
  colors:
    primary: "#3B82F6"
    accent: "#10B981"
    neutral: "#6B7280"
  
  typography:
    headings: "Inter"
    body: "Inter"

content:
  sections:
    - hero
    - features
    - testimonials
    - pricing
    - cta

features:
  - name: "Product Catalog"
    priority: "high"
    description: "Browse and search products"
  
  - name: "Shopping Cart"
    priority: "high" 
    description: "Add/remove items, checkout"

prompts:
  build_adapter: "lps_v2.1"
  include_micro_prompts: true
  quality_gates: true`;

  const configPreview = {
    mission: "Build a modern e-commerce platform that increases conversions through clear UX and trustworthy design",
    toggles: {
      responsive: true,
      darkMode: false,
      animations: true,
      accessibility: true
    },
    tokens: {
      primaryColor: "#3B82F6",
      accentColor: "#10B981",
      headingFont: "Inter",
      bodyFont: "Inter"
    }
  };

  return (
    <div className="h-full flex">
      {/* Editor Panel */}
      <div className="flex-1 flex flex-col border-r border-border">
        {/* Editor Header */}
        <div className="h-14 px-4 border-b border-border flex items-center justify-between bg-surface/50">
          <div className="flex items-center gap-4">
            <h3 className="font-medium">config.yaml</h3>
            <div className="flex items-center gap-2">
              {validationErrors.length > 0 ? (
                <Badge variant="destructive" className="text-xs">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {validationErrors.length} errors
                </Badge>
              ) : (
                <Badge className="text-xs bg-accent text-accent-foreground">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Valid
                </Badge>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Presets
            </Button>
            <Button size="sm" disabled={isValidating}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>

        {/* Monaco Editor Placeholder */}
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-card border border-border-subtle m-4 rounded-lg overflow-hidden">
            <div className="h-8 bg-surface border-b border-border flex items-center px-3">
              <span className="text-xs text-muted-foreground">Monaco YAML Editor</span>
            </div>
            <div className="p-4 font-mono text-sm h-full overflow-auto">
              <pre className="text-foreground whitespace-pre-wrap">
                {sampleYaml}
              </pre>
            </div>
          </div>
        </div>

        {/* Validation Panel */}
        {validationErrors.length > 0 && (
          <div className="h-32 border-t border-border bg-surface/50 p-4">
            <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-destructive" />
              Validation Errors
            </h4>
            <div className="space-y-1">
              {validationErrors.map((error, index) => (
                <div key={index} className="text-xs text-muted-foreground">
                  <span className="text-destructive">Line {error.line}:</span> {error.message}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Preview Panel */}
      <div className="w-96 flex flex-col">
        <div className="h-14 px-4 border-b border-border flex items-center bg-surface/50">
          <h3 className="font-medium flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Live Preview
          </h3>
        </div>

        <div className="flex-1 p-4 overflow-auto">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tokens">Tokens</TabsTrigger>
              <TabsTrigger value="schema">Schema</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2">Mission Statement</h4>
                <p className="text-sm text-muted-foreground">
                  {configPreview.mission}
                </p>
              </Card>

              <Card className="p-4">
                <h4 className="font-medium mb-3">Feature Toggles</h4>
                <div className="space-y-2">
                  {Object.entries(configPreview.toggles).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center">
                      <span className="text-sm capitalize">{key}</span>
                      <Badge variant={value ? "default" : "secondary"} className="text-xs">
                        {value ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="tokens" className="space-y-4">
              <Card className="p-4">
                <h4 className="font-medium mb-3">Design Tokens</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Primary Color</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: configPreview.tokens.primaryColor }}
                      />
                      <span className="text-xs font-mono">
                        {configPreview.tokens.primaryColor}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Accent Color</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: configPreview.tokens.accentColor }}
                      />
                      <span className="text-xs font-mono">
                        {configPreview.tokens.accentColor}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Heading Font</span>
                    <span className="text-xs font-mono">
                      {configPreview.tokens.headingFont}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Body Font</span>
                    <span className="text-xs font-mono">
                      {configPreview.tokens.bodyFont}
                    </span>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="schema" className="space-y-4">
              <Card className="p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Schema Validation
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  YAML structure validation against Prompt Forge schema v1.0
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    Project metadata complete
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    Brand configuration valid
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    Content sections missing descriptions
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="p-4 border-t border-border">
          <Button className="w-full bg-gradient-primary hover:opacity-90">
            <Play className="w-4 h-4 mr-2" />
            Generate Artifacts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfigEditor;