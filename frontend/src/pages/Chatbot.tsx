import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Send,
  Bot,
  User,
  Sparkles,
  BookOpen,
  FileText,
  Target,
  Lightbulb,
  Loader2,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const suggestedPrompts = [
  { text: "How should I prepare for a Google interview?", icon: Target },
  { text: "What skills should I focus on for a backend role?", icon: BookOpen },
  { text: "Review my resume and suggest improvements", icon: FileText },
  { text: "Create a 30-day study plan for DSA", icon: Lightbulb },
];

// Demo responses for mock mode
const demoResponses: Record<string, string> = {
  default: `Great question! Here's what I'd recommend:

1. **Focus on fundamentals** — Make sure your data structures and algorithms are solid
2. **Practice mock interviews** — Use the Mock Interview section to build confidence
3. **Track your progress** — Check the Dashboard regularly to monitor improvement

Would you like me to go deeper on any of these topics?`,
  google: `## Preparing for a Google Interview 🎯

Here's a structured approach:

### Technical Preparation
- **Data Structures**: Arrays, Trees, Graphs, Hash Maps
- **Algorithms**: BFS/DFS, Dynamic Programming, Sorting
- **Practice**: Solve 150+ LeetCode problems (focus on Medium/Hard)

### System Design
- Study distributed systems concepts
- Practice designing: URL shortener, chat system, news feed

### Behavioral
- Use the **STAR method** for behavioral questions
- Prepare stories about leadership, conflict resolution, and teamwork

### Timeline
| Week | Focus Area |
|------|-----------|
| 1-2 | DSA Fundamentals |
| 3-4 | Advanced Algorithms |
| 5-6 | System Design |
| 7-8 | Mock Interviews |

Want me to create a personalized roadmap based on your current skills?`,
  skills: `## Key Skills for Backend Roles 🔧

Based on current industry trends, here are the **most in-demand skills**:

### Must-Have
- **Languages**: Python, Java, Go, or Node.js
- **Databases**: PostgreSQL, MongoDB, Redis
- **APIs**: REST, GraphQL, gRPC
- **Cloud**: AWS/GCP/Azure fundamentals

### Good to Have
- Docker & Kubernetes
- Message Queues (Kafka, RabbitMQ)
- CI/CD pipelines
- Monitoring & Observability

### Your Current Gaps
Based on your profile, I'd recommend focusing on:
1. \`System Design\` — currently at 42%
2. \`Docker\` — not yet started
3. \`AWS\` — not yet started

Shall I generate a learning roadmap for these?`,
  resume: `## Resume Improvement Suggestions 📝

Based on your uploaded resume, here are my recommendations:

### ✅ Strengths
- Good project descriptions with quantifiable impact
- Clean, professional formatting
- Strong technical skills section

### ⚠️ Areas for Improvement

1. **Add more metrics** — Quantify your achievements
   - ❌ "Improved application performance"
   - ✅ "Improved application performance by **40%**, reducing load time from 3s to 1.8s"

2. **Tailor for each role** — Customize your resume keywords to match job descriptions

3. **Add a summary** — A 2-3 line professional summary at the top can make a strong first impression

4. **Project links** — Include GitHub links and live demo URLs

Would you like me to help rewrite any specific section?`,
  plan: `## 30-Day DSA Study Plan 📚

### Week 1: Arrays & Strings
| Day | Topic | Problems |
|-----|-------|----------|
| 1-2 | Two Pointers | 5 problems |
| 3-4 | Sliding Window | 5 problems |
| 5-7 | String Manipulation | 5 problems |

### Week 2: Linked Lists & Stacks
| Day | Topic | Problems |
|-----|-------|----------|
| 8-9 | Singly Linked List | 5 problems |
| 10-11 | Stack & Queue | 5 problems |
| 12-14 | Monotonic Stack | 5 problems |

### Week 3: Trees & Graphs
| Day | Topic | Problems |
|-----|-------|----------|
| 15-17 | Binary Trees & BST | 8 problems |
| 18-20 | BFS & DFS | 8 problems |
| 21 | Review & Mock Test | 1 test |

### Week 4: Advanced
| Day | Topic | Problems |
|-----|-------|----------|
| 22-24 | Dynamic Programming | 8 problems |
| 25-26 | Greedy Algorithms | 5 problems |
| 27-28 | Backtracking | 5 problems |
| 29-30 | Full Mock Tests | 2 tests |

> 💡 **Tip**: Spend at least 2 hours daily and review solutions you couldn't solve.

Want me to recommend specific problems for each topic?`,
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("google") || lower.includes("interview prep")) return demoResponses.google;
  if (lower.includes("skill") || lower.includes("backend")) return demoResponses.skills;
  if (lower.includes("resume") || lower.includes("cv")) return demoResponses.resume;
  if (lower.includes("plan") || lower.includes("study") || lower.includes("dsa")) return demoResponses.plan;
  return demoResponses.default;
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! 👋 I'm your **SkillSync AI Assistant**. I can help you with placement preparation, resume tips, interview strategies, and learning roadmaps.\n\nWhat would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    // Simulate AI thinking delay
    await new Promise((r) => setTimeout(r, 1200));

    const response = getResponse(text);
    const assistantMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: response,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsLoading(false);
  };

  return (
    <div className="flex h-[calc(100vh-5rem)] flex-col">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">AI Assistant</h1>
          <p className="text-sm text-muted-foreground mt-1">Your placement preparation copilot</p>
        </div>
        <Badge variant="outline" className="gap-1 border-primary/20 text-primary">
          <Sparkles className="h-3 w-3" /> AI Powered
        </Badge>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-auto rounded-xl border bg-card">
        <div className="flex flex-col p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 animate-fade-in ${msg.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  msg.role === "assistant" ? "bg-primary/10" : "bg-secondary"
                }`}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-4 w-4 text-primary" />
                ) : (
                  <User className="h-4 w-4 text-muted-foreground" />
                )}
              </div>
              <div
                className={`max-w-[75%] rounded-xl px-4 py-3 ${
                  msg.role === "assistant"
                    ? "bg-secondary text-card-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none text-card-foreground [&_h2]:font-display [&_h2]:text-base [&_h2]:font-semibold [&_h3]:font-display [&_h3]:text-sm [&_h3]:font-semibold [&_table]:text-xs [&_code]:bg-background/50 [&_code]:px-1 [&_code]:rounded [&_blockquote]:border-primary/30 [&_blockquote]:text-muted-foreground">
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  </div>
                ) : (
                  <p className="text-sm">{msg.content}</p>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 animate-fade-in">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                <Bot className="h-4 w-4 text-primary" />
              </div>
              <div className="rounded-xl bg-secondary px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" /> Thinking...
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 pt-3">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt.text}
              onClick={() => sendMessage(prompt.text)}
              className="flex items-center gap-1.5 rounded-lg border bg-card px-3 py-2 text-xs text-card-foreground transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <prompt.icon className="h-3 w-3 text-primary" />
              {prompt.text}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 pt-3">
        <div className="flex-1 flex items-center gap-2 rounded-xl border bg-card px-4 py-2 focus-within:border-primary/40 transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder="Ask anything about placement preparation..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            disabled={isLoading}
          />
        </div>
        <Button
          size="icon"
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isLoading}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
