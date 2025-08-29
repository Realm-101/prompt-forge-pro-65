import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import AppShell from "./pages/AppShell";
import ProjectsList from "./pages/ProjectsList";
import NewProjectWizard from "./pages/NewProjectWizard";
import ConfigEditor from "./pages/ConfigEditor";
import Generators from "./pages/Generators";
import VersionHistory from "./pages/VersionHistory";
import ExportShare from "./pages/ExportShare";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<ProjectsList />} />
            <Route path="new" element={<NewProjectWizard />} />
            <Route path=":id/config" element={<ConfigEditor />} />
            <Route path=":id/generate" element={<Generators />} />
            <Route path=":id/history" element={<VersionHistory />} />
            <Route path=":id/export" element={<ExportShare />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
