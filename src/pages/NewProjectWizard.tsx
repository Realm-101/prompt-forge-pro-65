import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const NewProjectWizard = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 text-center">
          <div className="w-16 h-16 bg-primary-subtle rounded-full flex items-center justify-center mx-auto mb-6">
            <Plus className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Create New Project</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Start building your next amazing project with Prompt Forge
          </p>
          <Button size="lg" className="bg-gradient-primary hover:opacity-90">
            Get Started
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default NewProjectWizard;