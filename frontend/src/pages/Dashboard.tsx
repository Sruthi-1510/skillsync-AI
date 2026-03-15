import { StatCard } from "@/components/StatCard";
import {
  FileText,
  Target,
  BookOpen,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const recentActivities = [
  { text: "Completed Python assessment", time: "2 hours ago", icon: CheckCircle2, status: "done" },
  { text: "Resume analysis updated", time: "5 hours ago", icon: FileText, status: "done" },
  { text: "React.js roadmap started", time: "1 day ago", icon: Clock, status: "progress" },
  { text: "Mock interview scheduled", time: "2 days ago", icon: AlertCircle, status: "pending" },
];

const skillProgress = [
  { name: "React.js", progress: 78 },
  { name: "Data Structures", progress: 65 },
  { name: "System Design", progress: 42 },
  { name: "Python", progress: 88 },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Welcome back, Student 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Here's your placement preparation overview
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Resume Match"
          value="76%"
          change="+3% from last week"
          changeType="positive"
          icon={Target}
        />
        <StatCard
          title="Skills Identified"
          value="24"
          change="4 gaps found"
          changeType="negative"
          icon={BookOpen}
        />
        <StatCard
          title="Assessments Done"
          value="8/12"
          change="On track"
          changeType="positive"
          icon={FileText}
        />
        <StatCard
          title="Placement Score"
          value="72%"
          change="+5% this month"
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Skill Progress */}
        <div className="lg:col-span-2 rounded-xl border bg-card p-5 animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-card-foreground">Skill Progress</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate("/roadmap")}>
              View all <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
          <div className="space-y-4">
            {skillProgress.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-card-foreground">{skill.name}</span>
                  <span className="text-xs text-muted-foreground">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-xl border bg-card p-5 animate-fade-in">
          <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-secondary">
                <activity.icon className={`mt-0.5 h-4 w-4 ${
                  activity.status === "done" ? "text-success" :
                  activity.status === "progress" ? "text-primary" :
                  "text-warning"
                }`} />
                <div className="min-w-0">
                  <p className="text-sm text-card-foreground">{activity.text}</p>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-3 sm:grid-cols-3">
        <button
          onClick={() => navigate("/resume")}
          className="flex items-center gap-3 rounded-xl border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-card-foreground">Upload Resume</p>
            <p className="text-xs text-muted-foreground">Analyze your skills</p>
          </div>
        </button>
        <button
          onClick={() => navigate("/assessments")}
          className="flex items-center gap-3 rounded-xl border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <Target className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm font-medium text-card-foreground">Take Assessment</p>
            <p className="text-xs text-muted-foreground">Test your knowledge</p>
          </div>
        </button>
        <button
          onClick={() => navigate("/interview")}
          className="flex items-center gap-3 rounded-xl border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-info/10">
            <TrendingUp className="h-5 w-5 text-info" />
          </div>
          <div>
            <p className="text-sm font-medium text-card-foreground">Mock Interview</p>
            <p className="text-xs text-muted-foreground">Practice with AI</p>
          </div>
        </button>
      </div>
    </div>
  );
}
