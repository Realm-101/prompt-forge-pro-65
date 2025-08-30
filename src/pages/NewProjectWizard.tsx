import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { UrlAnalysisService } from "@/utils/urlAnalysisService";
import { 
  ArrowRight, 
  ArrowLeft, 
  Globe, 
  Sparkles, 
  CheckCircle,
  AlertCircle,
  Link as LinkIcon,
  Upload,
  File,
  Image,
  X
} from "lucide-react";

const NewProjectWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    description: "",
    primaryGoal: "",
    sourceUrl: "",
    componentUrls: [""],
    uploadedFiles: [] as { id: string; name: string; type: string; url: string; size: number }[]
  });

  const [urlAnalysis, setUrlAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const steps = [
    { id: 1, title: "Project Basics", icon: Sparkles },
    { id: 2, title: "URL Analysis", icon: Globe },
    { id: 3, title: "Component URLs", icon: LinkIcon },
    { id: 4, title: "Review & Create", icon: CheckCircle }
  ];

  const analyzeUrl = async () => {
    if (!formData.sourceUrl) return;
    
    setIsAnalyzing(true);
    try {
      const analysis = await UrlAnalysisService.analyzeUrl(formData.sourceUrl);
      setUrlAnalysis(analysis);
    } catch (error) {
      console.error('URL analysis failed:', error);
      // Show error to user
      alert('Failed to analyze URL. Please check the URL and try again.');
    } finally {
      setIsAnalyzing(false);
    }
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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `temp/${fileName}`;
        
        // For now, we'll create mock file objects since storage buckets might not exist yet
        return {
          id: `${Date.now()}-${Math.random()}`,
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file),
          size: file.size
        };
      });
      
      const uploadedFiles = await Promise.all(uploadPromises);
      
      setFormData(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...uploadedFiles]
      }));
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = async (fileId: string) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter(f => f.id !== fileId)
    }));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  const createProject = async () => {
    try {
      // Generate basic YAML config based on form data
      const yamlConfig = generateYamlConfig();
      
      // Save project to database
      const { data, error } = await supabase
        .from('projects')
        .insert({
          name: formData.name,
          domain: formData.domain,
          description: formData.description,
          primary_goal: formData.primaryGoal,
          source_url: formData.sourceUrl,
          component_urls: formData.componentUrls.filter(url => url.trim()),
          uploaded_files: formData.uploadedFiles,
          url_analysis: urlAnalysis,
          config_yaml: yamlConfig
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating project:", error);
        alert("Error creating project. Please try again.");
        return;
      }

      console.log("Project created successfully:", data);
      
      // Navigate to the config editor for the new project
      navigate(`/app/${data.id}/config`);
      
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Error creating project. Please try again.");
    }
  };

  const generateYamlConfig = () => {
    return `forge_version: "1.0"
project:
  name: "${formData.name}"
  mission: "Produce a ${formData.primaryGoal || 'web application'} that enables users to ${formData.description || 'achieve their goals'}"
  domain: build
output_contract:
  sections:
    - id: intro
      title: "Introduction"
    - id: core
      title: "Core Content"
    - id: qa
      title: "QA / Verification"
  required_keys:
    - "acceptance_criteria"
    - "delivery_notes"
process_order:
  - define_structure
  - draft_core
  - wire_data_or_tools
  - validate
  - polish
quality_gates:
  build:
    lint: true
    typecheck: true
    tests: required
    lighthouse_min: 90
    a11y: "WCAG AA"
    security_headers: ["CSP", "Referrer-Policy", "X-Content-Type-Options"]
missing_input_policy:
  placeholders: "[[PLACEHOLDER]]"
  ask_at_most_one_question: true
single_source_of_truth:
  type: tokens
  location: "/content/config.*"
  tokens:
    colors:
      primary: "${urlAnalysis?.primaryColor || '#3B82F6'}"
      accent: "${urlAnalysis?.secondaryColor || '#10B981'}"
defaults:
  base_stack: heroui
  palette:
    primary: "${urlAnalysis?.primaryColor || '#3B82F6'}"
    accent: "${urlAnalysis?.secondaryColor || '#10B981'}"
  fonts:
    headings: "${urlAnalysis?.fonts?.[0] || 'Inter'}"
    body: "${urlAnalysis?.fonts?.[1] || 'Inter'}"
toggles:
  i18n: off
  blog: off
  pricing: on
  comparison: off
  scheduler: on
  map: off
  hero_3d: off
  interactive_widget: "none"
  cookie_consent: on
  analytics: "none"
  crm: "none"
  payments: "none"
maintainer_experience:
  structure: modular_components
  scripts: ["lint", "format", "test", "typecheck", "deps:check"]
  jsdoc_public_apis: true
  dependency_policy:
    install: "@latest"
    range: "~"
safety_and_compliance:
  regulated: false
  region: ""
  needs_age_gate: false
  notes: "Neutral, non-advisory language."
handoff_plan:
  edit_where: "/content/config.*"
  rotate_keys: []
  publish_steps: "GitHub → publish → custom domain DNS"${formData.sourceUrl ? `
source:
  url: "${formData.sourceUrl}"
  keywords: ${JSON.stringify(urlAnalysis?.keywords || [])}` : ''}${formData.componentUrls.filter(url => url.trim()).length > 0 ? `
components: ${JSON.stringify(formData.componentUrls.filter(url => url.trim()))}` : ''}`;
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
              
              {/* File Upload Section */}
              <div className="space-y-4">
                <div>
                  <Label>Content Upload</Label>
                  <p className="text-sm text-muted-foreground mb-3">
                    Upload documents and images to help inform the project
                  </p>
                </div>
                
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input
                    type="file"
                    id="file-upload"
                    multiple
                    accept="image/*,.pdf,.doc,.docx,.txt,.md"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="w-8 h-8 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">
                        {isUploading ? "Uploading..." : "Click to upload files"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supports images, PDFs, and documents
                      </p>
                    </div>
                  </label>
                </div>
                
                {/* Uploaded Files List */}
                {formData.uploadedFiles.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files</Label>
                    <div className="space-y-2">
                      {formData.uploadedFiles.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {file.type.startsWith('image/') ? (
                              <Image className="w-4 h-4 text-accent" />
                            ) : (
                              <File className="w-4 h-4 text-accent" />
                            )}
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(file.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
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
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-4 h-4 rounded" 
                            style={{ backgroundColor: urlAnalysis.primaryColor }}
                          />
                          <span className="text-sm">Primary: {urlAnalysis.primaryColor}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-4 h-4 rounded" 
                            style={{ backgroundColor: urlAnalysis.secondaryColor }}
                          />
                          <span className="text-sm">Accent: {urlAnalysis.secondaryColor}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Fonts:</strong> {urlAnalysis.fonts.join(', ')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Keywords</h4>
                      <div className="flex flex-wrap gap-2">
                        {urlAnalysis.keywords.map((keyword: string, index: number) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-primary-subtle text-primary text-xs rounded-full"
                          >
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
                  Add URLs to specific components or UI libraries you want to reference
                </p>
              </div>
              
              <div className="space-y-4">
                {formData.componentUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="https://component-library.com/button"
                      value={url}
                      onChange={(e) => updateComponentUrl(index, e.target.value)}
                    />
                    {formData.componentUrls.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeComponentUrl(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                
                <Button
                  variant="outline"
                  onClick={addComponentUrl}
                  className="w-full"
                >
                  Add Another URL
                </Button>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Review & Create</h2>
                <p className="text-muted-foreground">
                  Review your project details and create your new project
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Project Details</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Name:</span> {formData.name || "Not specified"}
                    </div>
                    <div>
                      <span className="font-medium">Domain:</span> {formData.domain || "Not specified"}
                    </div>
                    <div>
                      <span className="font-medium">Description:</span> {formData.description || "Not specified"}
                    </div>
                    <div>
                      <span className="font-medium">Primary Goal:</span> {formData.primaryGoal || "Not specified"}
                    </div>
                  </div>
                </Card>
                
                <Card className="p-4">
                  <h3 className="font-semibold mb-3">Resources</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Source URL:</span> {formData.sourceUrl || "None"}
                    </div>
                    <div>
                      <span className="font-medium">Component URLs:</span> {formData.componentUrls.filter(url => url.trim()).length}
                    </div>
                    <div>
                      <span className="font-medium">Uploaded Files:</span> {formData.uploadedFiles.length}
                    </div>
                    {urlAnalysis && (
                      <div className="flex items-center gap-2 mt-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">URL Analysis Complete</span>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
              
              {(!formData.name) && (
                <div className="flex items-center gap-2 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <p className="text-sm text-orange-800">
                    Please provide at least a project name to continue.
                  </p>
                </div>
              )}
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
            <Button onClick={nextStep}>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={createProject}
              disabled={!formData.name}
              className="bg-gradient-primary hover:opacity-90"
            >
              Create Project
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProjectWizard;