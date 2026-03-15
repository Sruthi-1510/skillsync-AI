import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Mic,
  MicOff,
  Video,
  MessageSquare,
  Star,
  Clock,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

const pastInterviews = [
  { id: 1, type: "Technical", company: "Google-style", date: "Mar 10, 2026", score: 78, feedback: "Strong problem-solving, improve time complexity analysis" },
  { id: 2, type: "Behavioral", company: "General", date: "Mar 8, 2026", score: 82, feedback: "Good STAR responses, be more concise" },
  { id: 3, type: "HR Round", company: "Amazon-style", date: "Mar 5, 2026", score: 70, feedback: "Work on leadership principles framing" },
];

const interviewTypes = [
  { type: "Technical", description: "DSA & Problem Solving", duration: "45 min", icon: MessageSquare },
  { type: "Behavioral", description: "STAR method questions", duration: "30 min", icon: Star },
  { type: "System Design", description: "Design scalable systems", duration: "45 min", icon: BarChart3 },
];

export default function MockInterview() {
  const [inSession, setInSession] = useState(false);
  const [micOn, setMicOn] = useState(true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Mock Interview</h1>
        <p className="text-sm text-muted-foreground mt-1">Practice with AI-powered interview simulations</p>
      </div>

      {!inSession ? (
        <>
          {/* Interview Types */}
          <div className="grid gap-4 sm:grid-cols-3">
            {interviewTypes.map((t) => (
              <button
                key={t.type}
                onClick={() => setInSession(true)}
                className="rounded-xl border bg-card p-5 text-left transition-all hover:border-primary/30 hover:shadow-sm animate-fade-in"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <t.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-semibold text-card-foreground">{t.type}</h3>
                <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
                <div className="flex items-center gap-1 mt-2">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{t.duration}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Past Interviews */}
          <div className="rounded-xl border bg-card p-5 animate-fade-in">
            <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">Past Interviews</h2>
            <div className="space-y-2">
              {pastInterviews.map((interview) => (
                <div key={interview.id} className="flex items-start gap-3 rounded-lg p-3 hover:bg-secondary transition-colors">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 mt-0.5">
                    <Mic className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-card-foreground">{interview.type} - {interview.company}</p>
                      <Badge variant="outline" className="text-xs">{interview.date}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{interview.feedback}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-primary">{interview.score}</span>
                    <span className="text-xs text-muted-foreground">/100</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Communication Metrics */}
          <div className="rounded-xl border bg-card p-5 animate-fade-in">
            <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">Communication Metrics</h2>
            <div className="grid gap-4 sm:grid-cols-4">
              {[
                { label: "Clarity", value: 78 },
                { label: "Confidence", value: 72 },
                { label: "Structure", value: 85 },
                { label: "Pace", value: 68 },
              ].map((m) => (
                <div key={m.label} className="text-center">
                  <div className="relative inline-flex items-center justify-center">
                    <svg className="h-20 w-20 -rotate-90">
                      <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                      <circle cx="40" cy="40" r="32" fill="none" stroke="hsl(var(--primary))" strokeWidth="6"
                        strokeDasharray={`${m.value * 2.01} 201`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-sm font-bold text-foreground">{m.value}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        /* Active Session */
        <div className="rounded-xl border bg-card p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Badge className="bg-destructive text-destructive-foreground animate-pulse">● LIVE</Badge>
              <h2 className="font-display text-lg font-semibold text-card-foreground mt-2">Technical Interview</h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> 12:45 remaining
            </div>
          </div>

          <div className="rounded-lg bg-secondary p-6 mb-6">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Current Question</p>
            <p className="text-base text-foreground font-medium">
              Explain the difference between BFS and DFS. When would you prefer one over the other? Provide a real-world example.
            </p>
          </div>

          <div className="rounded-lg border border-dashed p-8 flex flex-col items-center justify-center mb-6">
            <div className={`flex h-16 w-16 items-center justify-center rounded-full mb-3 ${micOn ? "bg-primary/10" : "bg-destructive/10"}`}>
              {micOn ? <Mic className="h-8 w-8 text-primary" /> : <MicOff className="h-8 w-8 text-destructive" />}
            </div>
            <p className="text-sm text-muted-foreground">{micOn ? "Listening... Speak your answer" : "Microphone muted"}</p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="icon" onClick={() => setMicOn(!micOn)}>
              {micOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>
            <Button variant="destructive" onClick={() => setInSession(false)}>
              End Interview
            </Button>
            <Button variant="outline">Skip Question</Button>
          </div>
        </div>
      )}
    </div>
  );
}
