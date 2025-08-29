import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowRight, 
  ArrowLeft, 
  Globe, 
  Sparkles, 
  CheckCircle,
  AlertCircle,
  Link as LinkIcon
} from "lucide-react";

const NewProjectWizard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    description: "",
    primaryGoal: "",
    sourceUrl: "",
    componentUrls: [""]
  });

  const [urlAnalysis, setUrlAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const steps = [
    { id: 1, title: "Project Basics", icon: Sparkles },
    { id: 2, title: "URL Analysis", icon: Globe },
    { id: 3, title: "Component URLs", icon: LinkIcon },
    { id: 4, title: "Review & Create", icon: CheckCircle }
  ];

  const analyzeUrl = async () => {
    if (!formData.sourceUrl) return;
    
    setIsAnalyzing(true);
    // Simulate URL analysis
    setTimeout(() => {
      setUrlAnalysis({
        title: "Modern SaaS Landing Page",
        description: "A clean, conversion-focused landing page for SaaS products",
        primaryColor: "#3B82F6",
        secondaryColor: "#10B981",
        fonts: ["Inter", "SF Pro Display"],
        keywords: ["SaaS", "productivity", "automation", "analytics"],
        confidence: 0.85
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const addComponentUrl = () => {
    setFormData(prev => ({
      ...prev,
      componentUrls: [...prev.componentUrls, ""]
    }));
  };

  const removeComponentUrl = (index: number) => {
    setFormData(prev => ({
      ...prev,
      componentUrls: prev.componentUrls.filter((_, i) => i !== index)
    }));
  };

  const updateComponentUrl = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      componentUrls: prev.componentUrls.map((url, i) => i === index ? value : url)
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-24 h-px mx-4 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-border'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Project Basics</h2>
                <p className="text-muted-foreground">
                  Let's start with some basic information about your project
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name</Label>
                  <Input 
                    id="name"
                    placeholder="My Awesome Website"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="domain">Domain (Optional)</Label>
                  <Input 
                    id="domain"
                    placeholder="mysite.com"
                    value={formData.domain}
                    onChange={(e) => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Project Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe what you're building..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal">Primary Goal</Label>
                <Input 
                  id="goal"
                  placeholder="Lead generation, sales, portfolio showcase..."
                  value={formData.primaryGoal}
                  onChange={(e) => setFormData(prev => ({ ...prev, primaryGoal: e.target.value }))}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">URL Analysis</h2>
                <p className="text-muted-foreground">
                  Provide a reference URL to analyze design patterns and content structure
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sourceUrl">Reference URL</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="sourceUrl"
                      placeholder="https://example.com"
                      value={formData.sourceUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, sourceUrl: e.target.value }))}
                    />
                    <Button 
                      onClick={analyzeUrl}
                      disabled={!formData.sourceUrl || isAnalyzing}
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze"}
                    </Button>
                  </div>
                </div>
                
                {urlAnalysis && (
                  <Card className="p-6 bg-accent-subtle">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold">Analysis Results</h3>
                      <div className="flex items-center gap-2 text-sm text-accent">
                        <CheckCircle className="w-4 h-4" />
                        {Math.round(urlAnalysis.confidence * 100)}% confidence
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Detected Content</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          <strong>Title:</strong> {urlAnalysis.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Description:</strong> {urlAnalysis.description}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Design Elements</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          <strong>Colors:</strong> {urlAnalysis.primaryColor}, {urlAnalysis.secondaryColor}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Fonts:</strong> {urlAnalysis.fonts.join(", ")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {urlAnalysis.keywords.map((keyword: string, index: number) => (
                          <span key={index} className="px-2 py-1 bg-background rounded-sm text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Component URLs</h2>
                <p className="text-muted-foreground">
                  Add up to 8 component library URLs for inspiration (optional)
                </p>
              </div>
              
              <div className="space-y-4">
                {formData.componentUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input 
                      placeholder={`Component URL ${index + 1}`}
                      value={url}
                      onChange={(e) => updateComponentUrl(index, e.target.value)}
                    />
                    {formData.componentUrls.length > 1 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => removeComponentUrl(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                
                {formData.componentUrls.length < 8 && (
                  <Button 
                    variant="outline" 
                    onClick={addComponentUrl}
                    className="w-full"
                  >
                    Add Another URL
                  </Button>
                )}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Review & Create</h2>
                <p className="text-muted-foreground">
                  Review your project details before creating the configuration
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Project Details</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Name:</strong> {formData.name || "Not specified"}</p>
                    <p><strong>Domain:</strong> {formData.domain || "Not specified"}</p>
                    <p><strong>Goal:</strong> {formData.primaryGoal || "Not specified"}</p>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Analysis Data</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Source URL:</strong> {formData.sourceUrl || "None"}</p>
                    <p><strong>Components:</strong> {formData.componentUrls.filter(url => url).length} URLs</p>
                    <p><strong>Analysis:</strong> {urlAnalysis ? "Complete" : "None"}</p>
                  </div>
                </Card>
              </div>
              
              <div className="bg-accent-subtle p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium text-accent">Ready to create</h4>
                    <p className="text-sm text-accent/80">
                      Your project will be created with a YAML configuration based on the provided information.
                      You can edit and refine it in the Config Editor.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          
          {currentStep < 4 ? (
            <Button 
              onClick={nextStep}
              disabled={currentStep === 1 && !formData.name}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button className="bg-gradient-primary hover:opacity-90">
              Create Project
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProjectWizard;