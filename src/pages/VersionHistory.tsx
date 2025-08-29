import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  History, 
  GitBranch, 
  RotateCcw, 
  Eye,
  Clock,
  User,
  FileText
} from "lucide-react";

const VersionHistory = () => {
  const versions = [
    {
      id: "v1.3",
      timestamp: "2 hours ago",
      author: "Auto-save",
      changes: ["Added checkout flow configuration", "Updated brand colors", "Added micro-prompts for cart functionality"],
      status: "current",
      configSize: "2.4 KB"
    },
    {
      id: "v1.2", 
      timestamp: "5 hours ago",
      author: "Manual save",
      changes: ["Enhanced product catalog settings", "Added testimonials section", "Updated typography tokens"],
      status: "stable",
      configSize: "2.1 KB"
    },
    {
      id: "v1.1",
      timestamp: "1 day ago", 
      author: "LPP Assistant",
      changes: ["Initial URL analysis integration", "Seeded brand configuration", "Added component library references"],
      status: "milestone",
      configSize: "1.8 KB"
    },
    {
      id: "v1.0",
      timestamp: "1 day ago",
      author: "Project creation",
      changes: ["Project initialized", "Basic configuration structure", "Default preset applied"],
      status: "initial",
      configSize: "1.2 KB"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "current": return "bg-primary text-primary-foreground";
      case "stable": return "bg-accent text-accent-foreground";
      case "milestone": return "bg-warning text-warning-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current": return <FileText className="w-3 h-3" />;
      case "stable": return <GitBranch className="w-3 h-3" />;
      case "milestone": return <History className="w-3 h-3" />;
      default: return <Clock className="w-3 h-3" />;
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Version History</h1>
          <p className="text-muted-foreground">
            Track changes and revert to previous configurations
          </p>
        </div>

        {/* Auto-save Status */}
        <Card className="p-4 mb-6 bg-accent-subtle border-accent/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-accent">Auto-save Enabled</h3>
                <p className="text-sm text-accent/80">
                  Changes are automatically saved every 30 seconds
                </p>
              </div>
            </div>
            <Badge className="bg-accent text-accent-foreground">
              Last saved: 2 min ago
            </Badge>
          </div>
        </Card>

        {/* Version Timeline */}
        <div className="space-y-4">
          {versions.map((version, index) => (
            <Card key={version.id} className="p-6 relative">
              {/* Timeline Line */}
              {index < versions.length - 1 && (
                <div className="absolute left-8 top-16 w-px h-12 bg-border" />
              )}
              
              <div className="flex items-start gap-4">
                {/* Version Badge */}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(version.status)}`}>
                    {getStatusIcon(version.status)}
                  </div>
                </div>

                {/* Version Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{version.id}</h3>
                      <Badge variant="outline" className="text-xs">
                        {version.configSize}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      {version.status !== "current" && (
                        <Button variant="outline" size="sm">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Revert
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {version.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {version.timestamp}
                    </div>
                  </div>

                  {/* Changes List */}
                  <div className="space-y-1">
                    {version.changes.map((change, changeIndex) => (
                      <div key={changeIndex} className="text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                        {change}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Diff Viewer Placeholder */}
        <Card className="p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Version Comparison</h3>
          <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
            <GitBranch className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              Select two versions to see differences
            </p>
            <p className="text-sm text-muted-foreground">
              Side-by-side YAML diff view will appear here
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VersionHistory;