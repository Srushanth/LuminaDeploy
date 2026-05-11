"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, Square, Copy, Eye, EyeOff, Terminal, 
  CheckCircle2, AlertCircle, Moon, RefreshCw, Check,
  Activity, HardDrive, ScrollText, Download, Trash2, Cpu, Server, Clock, Maximize2
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

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
  uptime: string;
  lastPing: string;
}

const INITIAL_DEPLOYMENTS: Deployment[] = [
  {
    id: "dep-1",
    name: "Production LLM Gateway",
    modelId: "llama3-8b",
    tag: "Ollama/CPU",
    status: "Running",
    baseUrl: "https://api.luminadeploy.com/v1/u123",
    apiKey: "sk-lumina-a8b2...9f0c",
    costPerHour: 0.05,
    uptime: "99.9%",
    lastPing: "12ms ago"
  },
  {
    id: "dep-2",
    name: "Internal RAG Agent",
    modelId: "mistral-7b",
    tag: "Ollama/CPU",
    status: "Sleeping",
    baseUrl: "https://api.luminadeploy.com/v1/u456",
    apiKey: "sk-lumina-c3d4...1e2f",
    costPerHour: 0.04,
    uptime: "99.2%",
    lastPing: "4 hours ago"
  }
];

const STARTUP_LOGS = [
  "[INFO] Initializing container lumina-worker-42...",
  "[INFO] Pulling model weights for Ollama/CPU...",
  "[WARN] High memory pressure detected during tensor allocation.",
  "[INFO] Allocating system memory (16GB)...",
  "[INFO] Loading tensors into memory...",
  "[INFO] Model loaded successfully in 4.2s.",
  "[INFO] Starting OpenAI-compatible server on port 8080...",
  "[INFO] Endpoint ready to accept connections."
];

const METRICS_DATA = [
  { time: "10:00", ttft: 120, tps: 45 },
  { time: "10:10", ttft: 125, tps: 42 },
  { time: "10:20", ttft: 115, tps: 48 },
  { time: "10:30", ttft: 118, tps: 47 },
  { time: "10:40", ttft: 130, tps: 40 },
  { time: "10:50", ttft: 122, tps: 44 },
  { time: "11:00", ttft: 121, tps: 46 },
];

function DeploymentCard({ deployment }: { deployment: Deployment }) {
  const [status, setStatus] = useState<DeploymentStatus>(deployment.status);
  const [logs, setLogs] = useState<string[]>(
    status === "Running" ? ["[INFO] Endpoint ready to accept connections."] : []
  );
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "metrics" | "hardware" | "logs">("overview");
  const [isLogExpanded, setIsLogExpanded] = useState(false);
  
  const logsEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logsEndRef.current && activeTab === "logs") {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, activeTab, isLogExpanded]);

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
      }, 600);
      return () => clearInterval(interval);
    } else if (status === "Sleeping") {
      setLogs(["[INFO] Container scaled to zero due to inactivity.", "[INFO] Sleeping..."]);
    } else if (status === "Error") {
      setLogs(["[ERROR] Container crashed unexpectedly.", "[ERROR] FATAL: Out of memory."]);
    }
  }, [status]);

  const handleToggleState = () => {
    if (status === "Running" || status === "Deploying") {
      setStatus("Sleeping");
    } else if (status === "Sleeping" || status === "Error") {
      setStatus("Deploying");
      setActiveTab("logs");
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

  const clearLogs = () => setLogs([]);

  const getStatusConfig = (s: DeploymentStatus) => {
    switch(s) {
      case "Running": return { color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", icon: <CheckCircle2 className="w-3 h-3" /> };
      case "Deploying": return { color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", icon: <RefreshCw className="w-3 h-3 animate-spin" /> };
      case "Sleeping": return { color: "text-zinc-400", bg: "bg-white/5", border: "border-white/10", icon: <Moon className="w-3 h-3" /> };
      case "Error": return { color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", icon: <AlertCircle className="w-3 h-3" /> };
    }
  };

  const sc = getStatusConfig(status);

  return (
    <Card className={`glass-card bg-transparent text-white border-white/10 flex flex-col transition-all duration-300 relative ${isLogExpanded && activeTab === 'logs' ? 'fixed inset-4 z-[100] bg-[#050505]/95 backdrop-blur-3xl' : 'overflow-hidden'}`}>
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[60px] rounded-full pointer-events-none opacity-20 ${
        status === "Running" ? "bg-emerald-500" : 
        status === "Deploying" ? "bg-cyan-500" : 
        status === "Error" ? "bg-purple-500" : "bg-transparent"
      }`} />

      <CardHeader className="pb-4 border-b border-white/5 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <CardTitle className="text-xl flex items-center gap-3">
                {deployment.name}
                {status === "Running" && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </CardTitle>
            </div>
            <div className="flex items-center gap-3 text-sm text-zinc-400 mt-2">
              <Badge variant="outline" className={`${sc.bg} ${sc.color} ${sc.border} flex items-center gap-1.5 py-0.5`}>
                {sc.icon} {status}
              </Badge>
              <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5" /> {deployment.modelId}</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Uptime: {deployment.uptime}</span>
            </div>
          </div>
          <div className="text-right flex flex-col items-end">
            <div className="text-sm font-medium">${deployment.costPerHour}/hr</div>
            <div className="text-xs text-zinc-500 flex items-center gap-1 mt-1">
              Last Ping: <span className="text-zinc-300">{deployment.lastPing}</span>
            </div>
          </div>
        </div>

        {/* Custom Tabs */}
        {!isLogExpanded && (
          <div className="flex items-center gap-1 mt-6 border-b border-white/10 pb-[-1px]">
            {[
              { id: "overview", icon: Terminal, label: "Overview" },
              { id: "metrics", icon: Activity, label: "Metrics" },
              { id: "hardware", icon: Cpu, label: "Hardware" },
              { id: "logs", icon: ScrollText, label: "Logs" },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id 
                    ? "border-cyan-400 text-cyan-400" 
                    : "border-transparent text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                <tab.icon className="w-4 h-4" /> {tab.label}
              </button>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-6 relative z-10 flex-1 overflow-auto">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-zinc-300">API Access</h4>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs text-zinc-500">Base URL</label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-3 py-2 rounded-md bg-black/50 border border-white/10 text-sm font-mono text-cyan-300 overflow-x-auto whitespace-nowrap">
                    {deployment.baseUrl}
                  </code>
                  <Button variant="outline" size="icon" className="shrink-0 border-white/10 hover:bg-white/10 hover:text-white" onClick={() => copyToClipboard(deployment.baseUrl, 'url')}>
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
                  <Button variant="outline" size="icon" className="shrink-0 border-white/10 hover:bg-white/10 hover:text-white" onClick={() => setShowApiKey(!showApiKey)}>
                    {showApiKey ? <EyeOff className="w-4 h-4 text-zinc-400" /> : <Eye className="w-4 h-4 text-zinc-400" />}
                  </Button>
                  <Button variant="outline" size="icon" className="shrink-0 border-white/10 hover:bg-white/10 hover:text-white" onClick={() => copyToClipboard(deployment.apiKey, 'key')}>
                    {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "metrics" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-zinc-300">Performance Analytics (Last 60m)</h4>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-transparent">Healthy</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-black/30 border border-white/5 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Time to First Token</span>
                  <span className="text-cyan-400 font-mono">120ms avg</span>
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={METRICS_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="time" hide />
                      <YAxis domain={['dataMin - 10', 'dataMax + 10']} hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', borderRadius: '8px' }}
                        itemStyle={{ color: '#06b6d4' }}
                      />
                      <Line type="monotone" dataKey="ttft" stroke="#06b6d4" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-black/30 border border-white/5 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Throughput (TPS)</span>
                  <span className="text-purple-400 font-mono">45 avg</span>
                </div>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={METRICS_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                      <XAxis dataKey="time" hide />
                      <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0a0a0a', borderColor: '#333', borderRadius: '8px' }}
                        itemStyle={{ color: '#c084fc' }}
                      />
                      <Line type="monotone" dataKey="tps" stroke="#c084fc" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "hardware" && (
          <div className="space-y-6">
            <h4 className="text-sm font-semibold text-zinc-300">GCP Resource Inspector</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 mb-2">
                  <Server className="w-4 h-4" /> 
                  <span className="font-semibold text-sm">Cluster Details</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-zinc-500">Region</span><span className="text-zinc-300 font-mono">us-central1-a</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Node Pool</span><span className="text-zinc-300 font-mono">lumina-worker-pool</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Pod Identity</span><span className="text-zinc-300 font-mono">enabled</span></div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center gap-2 text-emerald-400 mb-2">
                  <Cpu className="w-4 h-4" /> 
                  <span className="font-semibold text-sm">Phase 1 Compute (Active)</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-zinc-500">vCPU Allocation</span><span className="text-zinc-300 font-mono">8 Cores</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">RAM Allocation</span><span className="text-zinc-300 font-mono">16 GB</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">Storage</span><span className="text-zinc-300 font-mono">50GB SSD</span></div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-black/40 border border-dashed border-white/20 md:col-span-2 space-y-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 pointer-events-none" />
                <div className="flex justify-between items-center mb-2 relative z-10">
                  <div className="flex items-center gap-2 text-purple-400">
                    <HardDrive className="w-4 h-4" /> 
                    <span className="font-semibold text-sm">Phase 2 Accelerator (Coming Soon)</span>
                  </div>
                  <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30">Locked</Badge>
                </div>
                <div className="space-y-2 text-sm opacity-50 relative z-10">
                  <div className="flex justify-between"><span className="text-zinc-500">GPU Model</span><span className="text-zinc-300 font-mono">1x NVIDIA L4</span></div>
                  <div className="flex justify-between"><span className="text-zinc-500">VRAM Utilization</span><span className="text-zinc-300 font-mono">0 / 24 GB</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "logs" && (
          <div className={`flex flex-col ${isLogExpanded ? 'h-full' : 'h-[250px]'}`}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-zinc-300">Advanced Log Viewer</h4>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 border-white/10 hover:bg-white/10 hover:text-white" onClick={clearLogs}>
                  <Trash2 className="w-3 h-3" /> Clear
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 border-white/10 hover:bg-white/10 hover:text-white">
                  <Download className="w-3 h-3" /> Download
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs gap-1.5 border-white/10 hover:bg-white/10 hover:text-white" onClick={() => setIsLogExpanded(!isLogExpanded)}>
                  <Maximize2 className="w-3 h-3" /> {isLogExpanded ? 'Minimize' : 'Expand'}
                </Button>
              </div>
            </div>
            
            <div className="flex-1 rounded-md bg-[#0a0a0a] border border-white/10 p-4 font-mono text-xs overflow-y-auto custom-scrollbar shadow-inner relative">
              {logs.length === 0 ? (
                <span className="text-zinc-600 absolute top-4 left-4">Waiting for logs...</span>
              ) : (
                logs.map((log, i) => {
                  let colorClass = "text-zinc-300";
                  if (log.includes("[ERROR]")) colorClass = "text-purple-400 font-semibold drop-shadow-[0_0_8px_rgba(192,132,252,0.4)]";
                  if (log.includes("[WARN]")) colorClass = "text-yellow-400";
                  if (log.includes("[INFO]")) colorClass = "text-cyan-400";

                  return (
                    <div key={i} className={`mb-1.5 ${colorClass} leading-relaxed`}>
                      <span className="text-zinc-600 mr-2">{new Date().toISOString().split('T')[1].slice(0, 8)}</span>
                      {log}
                    </div>
                  );
                })
              )}
              <div ref={logsEndRef} />
            </div>
          </div>
        )}
      </CardContent>

      {!isLogExpanded && (
        <CardFooter className="pt-4 border-t border-white/5 bg-black/20 relative z-10 flex justify-between mt-auto">
          <Button variant="outline" className="text-xs border-white/10 hover:bg-white/5 hover:text-white">
            Configure Details
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
      )}
    </Card>
  );
}

export default function DeploymentsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Deployments</h1>
          <p className="text-zinc-400">Manage your active LLM endpoints and view metrics.</p>
        </div>
        <Button className="bg-white text-black hover:bg-zinc-200 gap-2 font-semibold">
          <Terminal className="w-4 h-4" /> New Deployment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {INITIAL_DEPLOYMENTS.map(dep => (
          <DeploymentCard key={dep.id} deployment={dep} />
        ))}
      </div>
    </div>
  );
}
