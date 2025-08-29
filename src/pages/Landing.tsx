import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Code, Zap, Globe, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border-subtle bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Prompt Forge</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/app">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/app/new">
              <Button>Open the App</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Build bulletproof prompts. Ship faster.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Turn messy ideas into production-grade prompts and real apps. 
            AI-assisted intake, config-driven generation, one-click handoff to Lovable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/app/new">
              <Button size="lg" className="bg-gradient-primary hover:opacity-90 px-8">
                Try the Wizard
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything you need to ship faster</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From messy requirements to production-ready prompts and live apps in minutes.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 text-center group hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-primary-subtle rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Intake Assistant</h3>
            <p className="text-muted-foreground">AI analyzes URLs and components to seed your config automatically</p>
          </Card>

          <Card className="p-6 text-center group hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-accent-subtle rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Config Editor</h3>
            <p className="text-muted-foreground">YAML editor with live validation and beautiful presets</p>
          </Card>

          <Card className="p-6 text-center group hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-primary-subtle rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Generators</h3>
            <p className="text-muted-foreground">Build/Research/Ops/Creative adapters with quality gates</p>
          </Card>

          <Card className="p-6 text-center group hover:shadow-lg transition-all duration-200">
            <div className="w-12 h-12 bg-accent-subtle rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">LPS Handoff</h3>
            <p className="text-muted-foreground">One-click export to Lovable with complete project bundles</p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="p-12 text-center bg-gradient-subtle border-border-subtle">
          <h2 className="text-3xl font-bold mb-4">Ready to ship faster?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join developers building better prompts and shipping real apps with Prompt Forge.
          </p>
          <Link to="/app/new">
            <Button size="lg" className="bg-gradient-primary hover:opacity-90">
              Open the App
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border-subtle bg-surface/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center">
                <Code className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold">Prompt Forge</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Prompt Forge. Built with Lovable.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;