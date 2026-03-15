import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Clock,
  CheckCircle2,
  Play,
  Lock,
  DollarSign,
  ArrowRight,
} from "lucide-react";

const roadmapPhases = [
  {
    phase: "Phase 1: Foundations",
    status: "completed" as const,
    items: [
      { name: "JavaScript Advanced Concepts", duration: "2 weeks", status: "completed", progress: 100 },
      { name: "Data Structures & Algorithms", duration: "3 weeks", status: "completed", progress: 100 },
    ],
  },
  {
    phase: "Phase 2: Core Skills",
    status: "in-progress" as const,
    items: [
      { name: "React.js & State Management", duration: "2 weeks", status: "in-progress", progress: 65 },
      { name: "TypeScript Essentials", duration: "1 week", status: "not-started", progress: 0 },
      { name: "System Design Basics", duration: "2 weeks", status: "not-started", progress: 0 },
    ],
  },
  {
    phase: "Phase 3: Advanced",
    status: "locked" as const,
    items: [
      { name: "Docker & Cloud Fundamentals", duration: "2 weeks", status: "locked", progress: 0 },
      { name: "AWS Core Services", duration: "2 weeks", status: "locked", progress: 0 },
    ],
  },
];

const courses = [
  { name: "React - The Complete Guide", provider: "Udemy", duration: "40h", match: "95%" },
  { name: "TypeScript Deep Dive", provider: "Frontend Masters", duration: "12h", match: "88%" },
  { name: "System Design Primer", provider: "YouTube", duration: "8h", match: "82%" },
  { name: "AWS Cloud Practitioner", provider: "AWS", duration: "20h", match: "75%" },
];

const salaryImpact = [
  { skill: "TypeScript", impact: "+₹1.2L/yr" },
  { skill: "System Design", impact: "+₹2.5L/yr" },
  { skill: "Docker", impact: "+₹1.8L/yr" },
  { skill: "AWS", impact: "+₹2.2L/yr" },
];

export default function Roadmap() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Learning Roadmap</h1>
        <p className="text-sm text-muted-foreground mt-1">Personalized learning path based on your skill gaps</p>
      </div>

      {/* Roadmap Timeline */}
      <div className="space-y-4">
        {roadmapPhases.map((phase) => (
          <div key={phase.phase} className="rounded-xl border bg-card p-5 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              {phase.status === "completed" ? (
                <CheckCircle2 className="h-5 w-5 text-success" />
              ) : phase.status === "in-progress" ? (
                <Play className="h-5 w-5 text-primary" />
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" />
              )}
              <h2 className="font-display text-base font-semibold text-card-foreground">{phase.phase}</h2>
              <Badge variant={
                phase.status === "completed" ? "default" :
                phase.status === "in-progress" ? "secondary" : "outline"
              } className={
                phase.status === "completed" ? "bg-success text-success-foreground" :
                phase.status === "in-progress" ? "bg-primary/10 text-primary border-primary/20" : ""
              }>
                {phase.status === "completed" ? "Completed" : phase.status === "in-progress" ? "In Progress" : "Locked"}
              </Badge>
            </div>
            <div className="space-y-3 ml-7">
              {phase.items.map((item) => (
                <div key={item.name} className="flex items-center gap-4 rounded-lg p-2.5 hover:bg-secondary transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${item.status === "locked" ? "text-muted-foreground" : "text-card-foreground"}`}>
                      {item.name}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{item.duration}</span>
                    </div>
                  </div>
                  {item.status !== "locked" && (
                    <div className="w-24">
                      <Progress value={item.progress} className="h-1.5" />
                      <p className="text-xs text-muted-foreground text-right mt-0.5">{item.progress}%</p>
                    </div>
                  )}
                </div>
              ))}
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
    </div>
  );
}
