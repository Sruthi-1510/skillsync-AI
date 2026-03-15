import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import ResumeIntelligence from "./pages/ResumeIntelligence";
import Roadmap from "./pages/Roadmap";
import Assessments from "./pages/Assessments";
import MockInterview from "./pages/MockInterview";
import PlacementIntelligence from "./pages/PlacementIntelligence";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/resume" element={<ResumeIntelligence />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/assessments" element={<Assessments />} />
            <Route path="/interview" element={<MockInterview />} />
            <Route path="/placement" element={<PlacementIntelligence />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
