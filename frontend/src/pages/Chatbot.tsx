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
import { chatWithMessage } from "@/lib/api";

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

// Demo responses removed. Calling backend API directly.

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

    try {
      const data = await chatWithMessage(text);
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply || "Sorry, I couldn't understand that.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Oops! Something went wrong while connecting to the server.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
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
