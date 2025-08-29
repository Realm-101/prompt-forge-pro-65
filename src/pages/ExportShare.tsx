import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Copy, 
  Download, 
  Share2, 
  Link as LinkIcon,
  FileText,
  Package,
  Eye,
  CheckCircle
} from "lucide-react";

const ExportShare = () => {
  const [shareUrl] = useState("https://promptforge.app/share/abc123");
  const [isPublic, setIsPublic] = useState(false);

  const exportFormats = [
    {
      name: "YAML Configuration",
      description: "Raw YAML config file",
      format: "config.yaml",
      size: "2.4 KB",
      icon: FileText
    },
    {
      name: "JSON Export", 
      description: "Machine-readable JSON format",
      format: "config.json",
      size: "3.1 KB", 
      icon: Package
    },
    {
      name: "Markdown Bundle",
      description: "Documentation with embedded config",
      format: "project-bundle.md",
      size: "8.7 KB",
      icon: FileText
    },
    {
      name: "Lovable Package",
      description: "Ready for LPS handoff",
      format: "lovable-bundle.zip",
      size: "12.3 KB",
      icon: Package
    }
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Export & Share</h1>
          <p className="text-muted-foreground">
            Export your configuration or share with collaborators
          </p>
        </div>

        <Tabs defaultValue="export" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="export" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Files
            </TabsTrigger>
            <TabsTrigger value="share" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Project
            </TabsTrigger>
          </TabsList>

          <TabsContent value="export" className="space-y-6">
            {/* Quick Export */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Export</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <Copy className="w-5 h-5" />
                    <span className="font-medium">Copy YAML</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Copy raw configuration to clipboard
                  </span>
                </Button>
                
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start">
                  <div className="flex items-center gap-2 mb-2">
                    <Download className="w-5 h-5" />
                    <span className="font-medium">Download Bundle</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Complete project package
                  </span>
                </Button>
              </div>
            </Card>

            {/* Export Formats */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Export Formats</h3>
              <div className="space-y-4">
                {exportFormats.map((format, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-subtle rounded-lg flex items-center justify-center">
                        <format.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{format.name}</h4>
                        <p className="text-sm text-muted-foreground">{format.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{format.size}</span>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Lovable Handoff */}
            <Card className="p-6 bg-accent-subtle border-accent/20">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-accent mb-2">Lovable Project Handoff</h3>
                  <p className="text-accent/80 mb-4">
                    Export a complete bundle ready for Lovable with Knowledge YAML, 
                    Master Prompt, and delivery specifications.
                  </p>
                  <div className="flex items-center gap-2">
                    <Button className="bg-accent hover:bg-accent-hover text-accent-foreground">
                      <Package className="w-4 h-4 mr-2" />
                      Create Lovable Package
                    </Button>
                    <Button variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview Bundle
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="share" className="space-y-6">
            {/* Share Link */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Share Link</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shareUrl">Public Share URL</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="shareUrl"
                      value={shareUrl}
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button onClick={() => copyToClipboard(shareUrl)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-surface rounded-lg">
                  <div>
                    <h4 className="font-medium">Public Access</h4>
                    <p className="text-sm text-muted-foreground">
                      Anyone with this link can view your configuration
                    </p>
                  </div>
                  <Button 
                    variant={isPublic ? "default" : "outline"}
                    onClick={() => setIsPublic(!isPublic)}
                  >
                    {isPublic ? "Public" : "Private"}
                  </Button>
                </div>

                {isPublic && (
                  <div className="bg-accent-subtle p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span className="font-medium text-accent">Link is live</span>
                    </div>
                    <p className="text-sm text-accent/80">
                      Your project is now publicly accessible at the share URL above.
                    </p>
                  </div>
                )}
              </div>
            </Card>

            {/* Collaboration */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Collaboration</h3>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Read-only Access</h4>
                    <Button size="sm" variant="outline">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      Generate Link
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Share a view-only version of your configuration
                  </p>
                </div>

                <div className="p-4 border border-border rounded-lg opacity-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Team Collaboration</h4>
                    <Button size="sm" variant="outline" disabled>
                      <Share2 className="w-4 h-4 mr-2" />
                      Invite Team
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Coming soon: Invite team members to edit collaboratively
                  </p>
                </div>
              </div>
            </Card>

            {/* Embed Options */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Embed Options</h3>
              <div className="space-y-4">
                <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Eye className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Embeddable widgets coming soon
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Embed live config previews in documentation or dashboards
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ExportShare;