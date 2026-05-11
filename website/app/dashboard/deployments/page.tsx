"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, Square, Copy, Eye, EyeOff, Terminal, 
  CheckCircle2, AlertCircle, Moon, RefreshCw, Check
} from "lucide-react";

type DeploymentStatus = "Running" | "Deploying" | "Sleeping" | "Error";

interface Deployment {
  id: string;
  name: string;
  modelId: string;
  tag: string;
  status: DeploymentStatus;
  baseUrl: string;
  apiKey: string;
  costPerHour: number;
}

const INITIAL_DEPLOYMENTS: Deployment[] = [
  {
    id: "dep-1",
    name: "Production LLM Gateway",
    modelId: "llama3-8b",
    tag: "Ollama/CPU",
    status: "Sleeping",
    baseUrl: "https://api.luminadeploy.com/v1/u123",
    apiKey: "sk-lumina-a8b2...9f0c",
    costPerHour: 0.05,
  },
  {
    id: "dep-2",
    name: "Internal RAG Agent",
    modelId: "mistral-7b",
    tag: "Ollama/CPU",
    status: "Running",
    baseUrl: "https://api.luminadeploy.com/v1/u456",
    apiKey: "sk-lumina-c3d4...1e2f",
    costPerHour: 0.04,
  }
];

const STARTUP_LOGS = [
  "INFO: Initializing container lumina-worker-42...",
  "INFO: Pulling model weights for Ollama/CPU...",
  "INFO: Allocating system memory (16GB)...",
  "INFO: Loading tensors into memory...",
  "INFO: Model loaded successfully in 4.2s.",
  "INFO: Starting OpenAI-compatible server on port 8080...",
  "SUCCESS: Endpoint ready to accept connections."
];

function DeploymentCard({ 
  deployment 
}: { 
  deployment: Deployment;
}) {
  const [status, setStatus] = useState<DeploymentStatus>(deployment.status);
  const [logs, setLogs] = useState<string[]>(
    status === "Running" ? ["SUCCESS: Endpoint ready to accept connections."] : []
  );
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  // Simulated deployment process
  useEffect(() => {
    if (status === "Deploying") {
      setLogs([]);
      let step = 0;
      
      const interval = setInterval(() => {
        if (step < STARTUP_LOGS.length) {
          setLogs(prev => [...prev, STARTUP_LOGS[step]]);
          step++;
        } else {
          clearInterval(interval);
          setStatus("Running");
        }
      }, 800); // 800ms per log line
      
      return () => clearInterval(interval);
    } else if (status === "Sleeping") {
      setLogs(["INFO: Container scaled to zero due to inactivity.", "INFO: Sleeping..."]);
    } else if (status === "Error") {
      setLogs(["ERROR: Container crashed unexpectedly.", "FATAL: Out of memory."]);
    }
  }, [status]);

  const handleToggleState = () => {
    if (status === "Running" || status === "Deploying") {
      setStatus("Sleeping");
    } else if (status === "Sleeping" || status === "Error") {
      setStatus("Deploying");
    }
  };

  const copyToClipboard = (text: string, type: 'url' | 'key') => {
    navigator.clipboard.writeText(text);
    if (type === 'url') {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    } else {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2000);
    }
  };

  const getStatusConfig = (s: DeploymentStatus) => {
    switch(s) {
      case "Running": return { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: <CheckCircle2 className="w-3 h-3" /> };
      case "Deploying": return { color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", icon: <RefreshCw className="w-3 h-3 animate-spin" /> };
      case "Sleeping": return { color: "text-zinc-400", bg: "bg-white/5", border: "border-white/10", icon: <Moon className="w-3 h-3" /> };
      case "Error": return { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", icon: <AlertCircle className="w-3 h-3" /> };
    }
  };

  const sc = getStatusConfig(status);

  return (
    <Card className="glass-card bg-transparent text-white border-white/10 flex flex-col transition-all duration-300 relative overflow-hidden">
      {/* Subtle status glow based on current state */}
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full pointer-events-none opacity-20 ${
        status === "Running" ? "bg-emerald-500" : 
        status === "Deploying" ? "bg-cyan-500" : 
        status === "Error" ? "bg-red-500" : "bg-transparent"
      }`} />

      <CardHeader className="pb-3 border-b border-white/5 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <CardTitle className="text-xl">{deployment.name}</CardTitle>
              <Badge variant="outline" className={`${sc.bg} ${sc.color} ${sc.border} flex items-center gap-1.5 py-0.5`}>
                {sc.icon} {status}
              </Badge>
            </div>
            <CardDescription className="text-zinc-400 flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" /> {deployment.modelId} • {deployment.tag}
            </CardDescription>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium">${deployment.costPerHour}/hr</div>
            <div className="text-xs text-zinc-500">Current Cost</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-6 relative z-10 flex-1">
        {/* API Access Panel */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-zinc-300">API Access</h4>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs text-zinc-500">Base URL</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 rounded-md bg-black/50 border border-white/10 text-sm font-mono text-cyan-300 overflow-x-auto">
                  {deployment.baseUrl}
                </code>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="shrink-0 border-white/10 hover:bg-white/10 hover:text-white"
                  onClick={() => copyToClipboard(deployment.baseUrl, 'url')}
                >
                  {copiedUrl ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                </Button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs text-zinc-500">API Key</label>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2 rounded-md bg-black/50 border border-white/10 text-sm font-mono text-zinc-300">
                  {showApiKey ? deployment.apiKey : "••••••••••••••••••••••••••••"}
                </code>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="shrink-0 border-white/10 hover:bg-white/10 hover:text-white"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="w-4 h-4 text-zinc-400" /> : <Eye className="w-4 h-4 text-zinc-400" />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="shrink-0 border-white/10 hover:bg-white/10 hover:text-white"
                  onClick={() => copyToClipboard(deployment.apiKey, 'key')}
                >
                  {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Log Stream */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-zinc-300">Console</h4>
            <div className="flex gap-1.5 items-center text-xs text-zinc-500">
              <div className={`w-2 h-2 rounded-full ${status === 'Running' || status === 'Deploying' ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-600'}`} />
              Live
            </div>
          </div>
          <div className="h-40 rounded-md bg-[#0a0a0a] border border-white/10 p-3 font-mono text-xs overflow-y-auto custom-scrollbar">
            {logs.length === 0 ? (
              <span className="text-zinc-600">Waiting for logs...</span>
            ) : (
              logs.map((log, i) => (
                <div key={i} className={`mb-1 ${
                  log.startsWith("ERROR") || log.startsWith("FATAL") ? "text-red-400" :
                  log.startsWith("SUCCESS") ? "text-emerald-400" : "text-zinc-300"
                }`}>
                  {log}
                </div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-4 border-t border-white/5 bg-black/20 relative z-10 flex justify-between">
        <Button variant="outline" className="text-xs border-white/10 hover:bg-white/5 hover:text-white">
          Configure
        </Button>
        <Button 
          onClick={handleToggleState}
          className={`gap-2 font-medium ${
            status === "Running" || status === "Deploying" 
              ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20" 
              : "bg-cyan-500 text-black hover:bg-cyan-400"
          }`}
        >
          {status === "Running" || status === "Deploying" ? (
            <><Square className="w-4 h-4 fill-current" /> Stop Endpoint</>
          ) : (
            <><Play className="w-4 h-4 fill-current" /> Start Endpoint</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function DeploymentsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Deployments</h1>
          <p className="text-zinc-400">Manage your active LLM endpoints and view metrics.</p>
        </div>
        <Button className="bg-white text-black hover:bg-zinc-200 gap-2 font-semibold">
          <Terminal className="w-4 h-4" /> New Deployment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {INITIAL_DEPLOYMENTS.map(dep => (
          <DeploymentCard key={dep.id} deployment={dep} />
        ))}
      </div>
    </div>
  );
}
