import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Users,
  BarChart3,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

const trendingSkills = [
  { name: "AI/ML", demand: 94, trend: "up" },
  { name: "Cloud Computing", demand: 89, trend: "up" },
  { name: "React.js", demand: 85, trend: "up" },
  { name: "Data Engineering", demand: 82, trend: "up" },
  { name: "Blockchain", demand: 45, trend: "down" },
];

const peerBenchmark = [
  { metric: "Resume Score", you: 76, average: 68 },
  { metric: "Assessment Avg", you: 83, average: 72 },
  { metric: "Skills Count", you: 24, average: 18 },
  { metric: "Interview Score", you: 77, average: 70 },
];

const companyTips = [
  { company: "Google", style: "Focuses on DSA & System Design", rounds: "5 rounds", tip: "Practice LeetCode medium-hard problems" },
  { company: "Microsoft", style: "Balanced technical + behavioral", rounds: "4 rounds", tip: "Strong focus on problem-solving approach" },
  { company: "Amazon", style: "Leadership principles driven", rounds: "5 rounds", tip: "Use STAR method for behavioral questions" },
  { company: "Flipkart", style: "System design heavy", rounds: "4 rounds", tip: "Focus on scalable system design patterns" },
];

export default function PlacementIntelligence() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Placement Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">Industry trends, peer benchmarks, and hiring insights</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Industry Trends */}
        <div className="rounded-xl border bg-card p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-card-foreground">Trending Skills (2026)</h2>
          </div>
          <div className="space-y-3">
            {trendingSkills.map((s) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-card-foreground">{s.name}</span>
                    {s.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 text-success" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-destructive" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{s.demand}% demand</span>
                </div>
                <Progress value={s.demand} className="h-1.5" />
              </div>
            ))}
          </div>
        </div>

        {/* Peer Benchmarking */}
        <div className="rounded-xl border bg-card p-5 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-semibold text-card-foreground">Peer Comparison</h2>
          </div>
          <div className="space-y-4">
            {peerBenchmark.map((b) => (
              <div key={b.metric}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-card-foreground">{b.metric}</span>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-primary font-semibold">You: {b.you}</span>
                    <span className="text-muted-foreground">Avg: {b.average}</span>
                  </div>
                </div>
                <div className="relative h-2 rounded-full bg-secondary">
                  <div className="absolute h-2 rounded-full bg-muted-foreground/30" style={{ width: `${b.average}%` }} />
                  <div className="absolute h-2 rounded-full bg-primary" style={{ width: `${b.you}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-primary" /> You</div>
            <div className="flex items-center gap-1.5"><div className="h-2 w-2 rounded-full bg-muted-foreground/30" /> Peer Average</div>
          </div>
        </div>
      </div>

      {/* Campus Hiring Tips */}
      <div className="rounded-xl border bg-card p-5 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Building2 className="h-5 w-5 text-primary" />
          <h2 className="font-display text-lg font-semibold text-card-foreground">Campus Hiring Insights</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {companyTips.map((c) => (
            <div key={c.company} className="rounded-lg border p-4 hover:border-primary/20 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-card-foreground">{c.company}</h3>
                <Badge variant="outline" className="text-xs">{c.rounds}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">{c.style}</p>
              <div className="flex items-start gap-1.5 mt-2 rounded bg-secondary p-2">
                <Lightbulb className="h-3 w-3 text-warning mt-0.5 shrink-0" />
                <p className="text-xs text-foreground">{c.tip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
