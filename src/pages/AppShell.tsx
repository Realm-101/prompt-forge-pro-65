import { Outlet, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Code, 
  FileText, 
  Zap, 
  Download, 
  History, 
  Settings,
  Home,
  Plus
} from "lucide-react";

const AppShell = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.includes(path);
  };

  const navigation = [
    { name: "Projects", href: "/app", icon: Home, active: location.pathname === "/app" },
    { name: "New Project", href: "/app/new", icon: Plus, active: isActive("/new") },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-border-subtle flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-border-subtle">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Prompt Forge</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} to={item.href}>
                <Button
                  variant={item.active ? "default" : "ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Project-specific navigation */}
          {location.pathname.includes("/app/") && !location.pathname.includes("/new") && (
            <div className="mt-8">
              <h3 className="text-sm font-medium text-muted-foreground mb-2 px-3">
                Current Project
              </h3>
              <div className="space-y-1">
                <Link to={`${location.pathname.split('/').slice(0, 3).join('/')}/config`}>
                  <Button
                    variant={isActive("/config") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                  >
                    <FileText className="w-4 h-4 mr-3" />
                    Config Editor
                  </Button>
                </Link>
                <Link to={`${location.pathname.split('/').slice(0, 3).join('/')}/generate`}>
                  <Button
                    variant={isActive("/generate") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Zap className="w-4 h-4 mr-3" />
                    Generators
                  </Button>
                </Link>
                <Link to={`${location.pathname.split('/').slice(0, 3).join('/')}/history`}>
                  <Button
                    variant={isActive("/history") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                  >
                    <History className="w-4 h-4 mr-3" />
                    Versions
                  </Button>
                </Link>
                <Link to={`${location.pathname.split('/').slice(0, 3).join('/')}/export`}>
                  <Button
                    variant={isActive("/export") ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start"
                  >
                    <Download className="w-4 h-4 mr-3" />
                    Export
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Settings */}
        <div className="p-4 border-t border-border-subtle">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 border-b border-border-subtle bg-background/80 backdrop-blur-sm flex items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-semibold">
              {location.pathname.includes("/new") ? "New Project Wizard" :
               location.pathname.includes("/config") ? "Config Editor" :
               location.pathname.includes("/generate") ? "Generators" :
               location.pathname.includes("/history") ? "Version History" :
               location.pathname.includes("/export") ? "Export & Share" :
               "Projects"}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Share
            </Button>
            <Button size="sm">
              Save
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppShell;