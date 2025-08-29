import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, FileText, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectsList = () => {
  // Mock data for demonstration
  const projects = [
    {
      id: "1",
      name: "E-commerce Website",
      domain: "mystore.com",
      lastModified: "2 hours ago",
      status: "draft"
    },
    {
      id: "2", 
      name: "SaaS Landing Page",
      domain: "mysaas.io",
      lastModified: "1 day ago",
      status: "ready"
    }
  ];

  return (
    <div className="p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Projects</h1>
            <p className="text-muted-foreground">
              Manage your Prompt Forge projects and configurations
            </p>
          </div>
          <Link to="/app/new">
            <Button className="bg-gradient-primary hover:opacity-90">
              <Plus className="w-5 h-5 mr-2" />
              New Project
            </Button>
          </Link>
        </div>

        {/* Projects Grid */}
        {projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card key={project.id} className="p-6 hover:shadow-lg transition-all duration-200 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-subtle rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className={`px-2 py-1 rounded-sm text-xs font-medium ${
                    project.status === 'ready' 
                      ? 'bg-accent-subtle text-accent' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {project.status}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{project.domain}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {project.lastModified}
                  </div>
                  <Link to={`/app/${project.id}/config`}>
                    <Button size="sm" variant="outline">
                      Open
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <Card className="p-12 text-center">
            <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get started by creating your first project with our AI-assisted wizard
            </p>
            <Link to="/app/new">
              <Button className="bg-gradient-primary hover:opacity-90">
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Project
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;