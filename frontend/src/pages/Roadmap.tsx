import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Play,
  Lock,
  DollarSign,
  Loader2,
  AlertCircle
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";
import { generateRoadmap } from "@/lib/api";

export default function Roadmap() {
  const { missingSkills } = useAppStore();
  const [isLoading, setIsLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [roadmapWeeks, setRoadmapWeeks] = useState<any[]>([]);
  const { toast } = useToast();

  const courses = [
    { name: "React - The Complete Guide", provider: "Udemy", duration: "40h", match: "95%" },
    { name: "TypeScript Deep Dive", provider: "Frontend Masters", duration: "12h", match: "88%" },
    { name: "System Design Primer", provider: "YouTube", duration: "8h", match: "82%" },
    { name: "AWS Cloud Practitioner", provider: "AWS", duration: "20h", match: "75%" },
  ];

  const salaryImpact = [
    { skill: "System Design", impact: "+₹2.5L/yr" },
    { skill: "Docker & AWS", impact: "+₹1.8L/yr" },
  ];

  const handleGenerate = async () => {
    if (!missingSkills || missingSkills.length === 0) {
      toast({
        title: "No Missing Skills",
        description: "Please upload a resume first to identify skill gaps.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await generateRoadmap(missingSkills, "Software Engineer", 8);
      setRoadmapWeeks(data.roadmap || []);
      setHasGenerated(true);
      toast({
        title: "Roadmap Generated",
        description: data.summary,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to generate roadmap from AI.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Learning Roadmap</h1>
          <p className="text-sm text-muted-foreground mt-1">Personalized learning path based on your skill gaps</p>
        </div>
        {!hasGenerated && (
          <Button onClick={handleGenerate} disabled={isLoading} className="mt-4 sm:mt-0">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Generating..." : "Generate AI Roadmap"}
          </Button>
        )}
      </div>

      {!hasGenerated && !isLoading && (
        <div className="rounded-xl border border-dashed p-8 text-center bg-card">
          <BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <h3 className="font-display text-lg font-medium text-foreground">No Roadmap Generated</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {missingSkills.length > 0
              ? `We found ${missingSkills.length} skill gaps. Click the button above to generate a path.`
              : "Upload your resume first to identify your skill gaps before generating a roadmap."}
          </p>
        </div>
      )}

      {isLoading && (
        <div className="rounded-xl border p-12 text-center bg-card flex flex-col items-center">
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
          <p className="text-sm text-muted-foreground">AI is mapping out your personalized learning journey...</p>
        </div>
      )}

      {hasGenerated && (
        <>
          {/* Roadmap Timeline */}
          <div className="space-y-4">
            {roadmapWeeks.map((weekData, idx) => (
              <div key={idx} className="rounded-xl border bg-card p-5 animate-fade-in">
                <div className="flex items-center gap-2 mb-4">
                  {idx === 0 ? (
                    <Play className="h-5 w-5 text-primary" />
                  ) : (
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  )}
                  <h2 className="font-display text-base font-semibold text-card-foreground">
                    {weekData.week}: {weekData.topic}
                  </h2>
                  <Badge variant={
                    idx === 0 ? "secondary" : "outline"
                  } className={
                    idx === 0 ? "bg-primary/10 text-primary border-primary/20" : ""
                  }>
                    {idx === 0 ? "In Progress" : "Locked"}
                  </Badge>
                </div>
                <div className="space-y-3 ml-7">
                  <p className="text-sm text-muted-foreground">{weekData.description}</p>
                  
                  <div className="bg-secondary/50 rounded-lg p-3 mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Project</p>
                    <p className="text-sm text-foreground">{weekData.project}</p>
                  </div>
                  
                  {weekData.resources && weekData.resources.length > 0 && (
                     <div className="mt-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Resources</p>
                        <ul className="list-disc leading-tight pl-5 space-y-1">
                          {weekData.resources.map((res: string, i: number) => (
                            <li key={i} className="text-sm text-primary underline cursor-pointer">{res}</li>
                          ))}
                        </ul>
                     </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Recommended Courses */}
            <div className="rounded-xl border bg-card p-5 animate-fade-in">
              <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">Recommended Courses</h2>
              <div className="space-y-2">
                {courses.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-secondary transition-colors">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.provider} • {c.duration}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{c.match}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Salary Impact */}
            <div className="rounded-xl border bg-card p-5 animate-fade-in">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-success" />
                <h2 className="font-display text-lg font-semibold text-card-foreground">Salary Impact</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Estimated salary boost by learning these skills</p>
              <div className="space-y-3">
                {salaryImpact.map((s) => (
                  <div key={s.skill} className="flex items-center justify-between rounded-lg p-3 bg-secondary">
                    <span className="text-sm font-medium text-foreground">{s.skill}</span>
                    <span className="text-sm font-bold text-success">{s.impact}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
