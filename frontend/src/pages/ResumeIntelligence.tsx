import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
  Building2,
  ArrowRight,
  Github,
} from "lucide-react";

const matchedSkills = ["React.js", "JavaScript", "Python", "Git", "REST APIs", "SQL"];
const missingSkills = ["System Design", "Docker", "AWS", "TypeScript"];
const matchingCompanies = [
  { name: "Google", match: 82, role: "SDE Intern" },
  { name: "Microsoft", match: 78, role: "Software Engineer" },
  { name: "Amazon", match: 75, role: "SDE I" },
  { name: "Flipkart", match: 72, role: "Backend Engineer" },
  { name: "Razorpay", match: 68, role: "Full Stack Developer" },
];

export default function ResumeIntelligence() {
  const [uploaded, setUploaded] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">Resume Intelligence</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload your resume for AI-powered skill analysis</p>
      </div>

      {/* Upload Section */}
      <div className="rounded-xl border bg-card p-6 animate-fade-in">
        {!uploaded ? (
          <div
            className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border p-10 transition-colors hover:border-primary/40 cursor-pointer"
            onClick={() => setUploaded(true)}
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground">Drop your resume here or click to upload</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOCX up to 5MB</p>
            <Button className="mt-4" size="sm">
              <Upload className="mr-2 h-4 w-4" /> Choose File
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-lg bg-secondary p-3">
            <FileText className="h-5 w-5 text-primary" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">resume_john_doe.pdf</p>
              <p className="text-xs text-muted-foreground">Uploaded just now • 245 KB</p>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">Analyzed</Badge>
          </div>
        )}
      </div>

      {uploaded && (
        <>
          {/* Match Score */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl border bg-card p-5 animate-fade-in">
              <p className="text-sm text-muted-foreground">Overall Match Score</p>
              <div className="mt-2 flex items-end gap-2">
                <span className="font-display text-4xl font-bold text-primary">76%</span>
              </div>
              <Progress value={76} className="mt-3 h-2" />
              <p className="mt-2 text-xs text-muted-foreground">Based on top 50 job descriptions</p>
            </div>

            <div className="rounded-xl border bg-card p-5 animate-fade-in">
              <p className="text-sm text-muted-foreground">Skills Detected</p>
              <span className="font-display text-4xl font-bold text-foreground mt-2 block">{matchedSkills.length}</span>
              <p className="mt-2 text-xs text-success font-medium">All validated via resume parsing</p>
            </div>

            <div className="rounded-xl border bg-card p-5 animate-fade-in">
              <p className="text-sm text-muted-foreground">Skill Gaps</p>
              <span className="font-display text-4xl font-bold text-destructive mt-2 block">{missingSkills.length}</span>
              <p className="mt-2 text-xs text-muted-foreground">Recommended to learn</p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Skills */}
            <div className="rounded-xl border bg-card p-5 animate-fade-in">
              <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">Skill Analysis</h2>
              <div className="space-y-3">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Matched Skills</p>
                <div className="flex flex-wrap gap-2">
                  {matchedSkills.map((s) => (
                    <Badge key={s} variant="secondary" className="gap-1">
                      <CheckCircle2 className="h-3 w-3 text-success" /> {s}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-2">Missing Skills</p>
                <div className="flex flex-wrap gap-2">
                  {missingSkills.map((s) => (
                    <Badge key={s} variant="secondary" className="gap-1">
                      <XCircle className="h-3 w-3 text-destructive" /> {s}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" className="mt-4 gap-1">
                <Github className="h-4 w-4" /> Connect GitHub for validation
              </Button>
            </div>

            {/* Company Matches */}
            <div className="rounded-xl border bg-card p-5 animate-fade-in">
              <h2 className="font-display text-lg font-semibold text-card-foreground mb-4">Top Matching Companies</h2>
              <div className="space-y-2">
                {matchingCompanies.map((c) => (
                  <div key={c.name} className="flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-secondary">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-card-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{c.role}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-semibold text-primary">{c.match}%</span>
                    </div>
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
