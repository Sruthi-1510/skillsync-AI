import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ClipboardCheck,
  Clock,
  CheckCircle2,
  Play,
  Target,
  Brain,
  TrendingUp,
} from "lucide-react";

const assessments = [
  { id: 1, name: "JavaScript Fundamentals", questions: 20, duration: "30 min", difficulty: "Easy", status: "completed", score: 85 },
  { id: 2, name: "React.js Concepts", questions: 25, duration: "40 min", difficulty: "Medium", status: "completed", score: 72 },
  { id: 3, name: "Data Structures", questions: 30, duration: "45 min", difficulty: "Hard", status: "in-progress", score: null },
  { id: 4, name: "System Design", questions: 15, duration: "30 min", difficulty: "Hard", status: "available", score: null },
  { id: 5, name: "SQL & Databases", questions: 20, duration: "30 min", difficulty: "Medium", status: "available", score: null },
  { id: 6, name: "Python Programming", questions: 25, duration: "35 min", difficulty: "Easy", status: "completed", score: 92 },
];

const mcqSample = {
  question: "What is the output of: console.log(typeof null)?",
  options: ["'null'", "'undefined'", "'object'", "'boolean'"],
  correct: 2,
};

export default function Assessments() {
  const [activeTest, setActiveTest] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const completed = assessments.filter((a) => a.status === "completed");
  const avgScore = Math.round(completed.reduce((s, a) => s + (a.score || 0), 0) / completed.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Assessments</h1>
        <p className="text-sm text-muted-foreground mt-1">Test your skills with adaptive difficulty quizzes</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-card p-5 animate-fade-in">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">Average Score</p>
          </div>
          <p className="font-display text-3xl font-bold text-foreground mt-2">{avgScore}%</p>
        </div>
        <div className="rounded-xl border bg-card p-5 animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <p className="text-sm text-muted-foreground">Completed</p>
          </div>
          <p className="font-display text-3xl font-bold text-foreground mt-2">{completed.length}/{assessments.length}</p>
        </div>
        <div className="rounded-xl border bg-card p-5 animate-fade-in">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">Placement Probability</p>
          </div>
          <p className="font-display text-3xl font-bold text-success mt-2">68%</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Assessment List */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-5 animate-fade-in">
          <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">All Assessments</h2>
          <div className="space-y-2">
            {assessments.map((a) => (
              <div key={a.id} className="flex items-center gap-3 rounded-lg p-3 hover:bg-secondary transition-colors">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  a.status === "completed" ? "bg-success/10" :
                  a.status === "in-progress" ? "bg-primary/10" : "bg-secondary"
                }`}>
                  {a.status === "completed" ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : a.status === "in-progress" ? (
                    <Play className="h-4 w-4 text-primary" />
                  ) : (
                    <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{a.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-muted-foreground">{a.questions} questions</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{a.duration}</span>
                  </div>
                </div>
                <Badge variant="outline" className={`text-xs ${
                  a.difficulty === "Easy" ? "border-success/30 text-success" :
                  a.difficulty === "Medium" ? "border-warning/30 text-warning" :
                  "border-destructive/30 text-destructive"
                }`}>
                  {a.difficulty}
                </Badge>
                {a.score !== null ? (
                  <span className="text-sm font-semibold text-primary w-12 text-right">{a.score}%</span>
                ) : (
                  <Button size="sm" variant={a.status === "in-progress" ? "default" : "outline"}
                    onClick={() => setActiveTest(true)}>
                    {a.status === "in-progress" ? "Continue" : "Start"}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sample Question */}
        <div className="rounded-xl border bg-card p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5 text-primary" />
            <h2 className="font-display text-base font-semibold text-card-foreground">Quick Practice</h2>
          </div>
          <p className="text-sm text-card-foreground mb-4">{mcqSample.question}</p>
          <div className="space-y-2">
            {mcqSample.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={`w-full text-left rounded-lg border p-3 text-sm transition-all ${
                  selected === i
                    ? i === mcqSample.correct
                      ? "border-success bg-success/10 text-success"
                      : "border-destructive bg-destructive/10 text-destructive"
                    : "hover:border-primary/30 text-card-foreground"
                }`}
              >
                <span className="font-medium mr-2">{String.fromCharCode(65 + i)}.</span>
                {opt}
              </button>
            ))}
          </div>
          {selected !== null && (
            <p className={`mt-3 text-sm font-medium ${selected === mcqSample.correct ? "text-success" : "text-destructive"}`}>
              {selected === mcqSample.correct ? "✓ Correct!" : `✗ Correct answer: ${mcqSample.options[mcqSample.correct]}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
