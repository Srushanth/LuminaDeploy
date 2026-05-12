"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Box, Terminal, ArrowRight, Server, Play, Search, Database, Cloud, AlertTriangle, X, Code, Eye } from "lucide-react";
import Link from "next/link";

const ALL_MODELS = [
  {
    id: "llama3-8b",
    name: "Llama 3 8B",
    tag: "Ollama/CPU",
    rate: "$0.05",
    description: "Highly capable general purpose open-source model by Meta.",
    icon: <Box className="w-5 h-5 text-cyan-400" />,
    categories: ["Small/Fast", "Coding"],
    isPreCached: true,
    parameters: "8B",
    parameterCount: 8,
    contextWindow: "8k",
    expectedTps: "45 tokens/sec",
    featured: true,
  },
  {
    id: "mistral-7b",
    name: "Mistral 7B",
    tag: "Ollama/CPU",
    rate: "$0.04",
    description: "Fast, efficient, and powerful for a wide variety of tasks.",
    icon: <Zap className="w-5 h-5 text-amber-400" />,
    categories: ["Small/Fast"],
    isPreCached: true,
    parameters: "7B",
    parameterCount: 7,
    contextWindow: "8k",
    expectedTps: "50 tokens/sec",
    featured: false,
  },
  {
    id: "mixtral-8x7b",
    name: "Mixtral 8x7b",
    tag: "Ollama/CPU",
    rate: "$0.15",
    description: "High quality sparse mixture of experts model.",
    icon: <Server className="w-5 h-5 text-emerald-400" />,
    categories: ["High Logic", "Coding"],
    isPreCached: true,
    parameters: "46.7B",
    parameterCount: 46.7,
    contextWindow: "32k",
    expectedTps: "15 tokens/sec",
    featured: true,
  },
  {
    id: "phi-3-mini",
    name: "Phi-3 Mini",
    tag: "Ollama/CPU",
    rate: "$0.02",
    description: "Lightweight, highly efficient model by Microsoft.",
    icon: <Cpu className="w-5 h-5 text-blue-400" />,
    categories: ["Small/Fast"],
    isPreCached: true,
    parameters: "3.8B",
    parameterCount: 3.8,
    contextWindow: "128k",
    expectedTps: "60 tokens/sec",
    featured: false,
  },
  {
    id: "llava-13b",
    name: "LLaVA 13B",
    tag: "Ollama/CPU",
    rate: "$0.10",
    description: "Advanced vision-language model for image understanding.",
    icon: <Eye className="w-5 h-5 text-purple-400" />,
    categories: ["Vision"],
    isPreCached: false,
    parameters: "13B",
    parameterCount: 13,
    contextWindow: "4k",
    expectedTps: "25 tokens/sec",
    featured: false,
  },
  {
    id: "codellama-34b",
    name: "CodeLlama 34B",
    tag: "Ollama/CPU",
    rate: "$0.12",
    description: "State-of-the-art model designed specifically for coding tasks.",
    icon: <Code className="w-5 h-5 text-indigo-400" />,
    categories: ["Coding", "High Logic"],
    isPreCached: false,
    parameters: "34B",
    parameterCount: 34,
    contextWindow: "16k",
    expectedTps: "20 tokens/sec",
    featured: false,
  }
];

const CATEGORIES = ["All", "Coding", "Vision", "Small/Fast", "High Logic"];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedModel, setSelectedModel] = useState<any>(null);

  const filteredModels = ALL_MODELS.filter((model) => {
    const matchesCategory = activeCategory === "All" || model.categories.includes(activeCategory);
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          model.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const showOllamaFallback = searchQuery.length > 0 && filteredModels.length === 0;

  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan-500/30 relative">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Lumina<span className="text-cyan-400">Deploy</span></span>
          </div>
          <nav className="flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/dashboard/wallet">
              <Button variant="outline" className="hidden sm:inline-flex border-white/20 hover:bg-white/10 text-white">Sign In</Button>
            </Link>
            <Link href="/dashboard/wallet">
              <Button className="bg-cyan-500 text-black hover:bg-cyan-400">Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full relative py-24 md:py-32 lg:py-48 flex flex-col items-center justify-center overflow-hidden">
          {/* Glowing Background Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-500/20 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="container px-4 relative z-10 flex flex-col items-center text-center">
            <Badge variant="outline" className="mb-6 border-cyan-500/30 text-cyan-300 bg-cyan-500/10 py-1 px-3">
              Phase 1 is now live
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 drop-shadow-sm">
              Deploy LLM Endpoints <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">in Seconds.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10">
              The fastest way to host open-source models like Llama 3 and Mistral. 
              Spin up scalable inference endpoints with a single click.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/dashboard/wallet">
                <Button size="lg" className="gap-2 text-md font-semibold px-8 bg-cyan-500 text-black hover:bg-cyan-400">
                  Deploy Now <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="gap-2 text-md px-8 border-white/20 text-white hover:bg-white/10">
                View Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Model Gallery Section */}
        <section className="w-full py-16 md:py-24 bg-black/40 border-t border-white/5 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Model Library</h2>
              <p className="text-zinc-400 max-w-2xl mb-8">
                Search, filter, and deploy from our curated collection of optimized open-source models, or pull any model directly from the Ollama registry.
              </p>

              {/* Dynamic Search & Filters */}
              <div className="w-full max-w-3xl space-y-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-zinc-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search models or deploy by Ollama tag (e.g. 'llama3:8b')..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                  />
                </div>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {CATEGORIES.map(category => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                        activeCategory === category 
                          ? "bg-cyan-500 text-black" 
                          : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredModels.map((model) => (
                <Card 
                  key={model.id} 
                  onClick={() => setSelectedModel(model)}
                  className={`glass-card flex flex-col bg-black/40 text-white border-white/10 group cursor-pointer transition-all hover:-translate-y-1 relative overflow-hidden ${
                    model.featured ? "shadow-[0_0_30px_-5px_rgba(6,182,212,0.15)] border-cyan-500/30" : ""
                  }`}
                >
                  {model.featured && (
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-50 pointer-events-none" />
                  )}
                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-2">
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                          {model.icon}
                        </div>
                        {model.isPreCached ? (
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 py-0 text-[10px] h-6 flex items-center gap-1">
                            <Database className="w-3 h-3" /> Pre-cached
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 py-0 text-[10px] h-6 flex items-center gap-1">
                            <Cloud className="w-3 h-3" /> On-Demand
                          </Badge>
                        )}
                      </div>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border-transparent hover:bg-cyan-500/30 whitespace-nowrap">{model.tag}</Badge>
                    </div>
                    <CardTitle className="text-xl font-bold">{model.name}</CardTitle>
                    {model.parameterCount > 12 && (
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 mt-2 bg-amber-400/10 w-fit px-2 py-1 rounded-md border border-amber-400/20">
                        <AlertTriangle className="w-3.5 h-3.5" /> Slow on CPU
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="flex-1 relative z-10">
                    <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">{model.description}</p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">{model.rate}</span>
                      <span className="text-sm text-zinc-500">/ hr</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-white/5 mt-auto relative z-10">
                    <Button variant="ghost" className="w-full gap-2 text-zinc-400 group-hover:text-cyan-400 hover:bg-transparent">
                      View Details <ArrowRight className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {showOllamaFallback && (
                <Card className="glass-card flex flex-col bg-cyan-950/20 text-white border-cyan-500/30 border-dashed cursor-pointer hover:bg-cyan-900/20 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="p-2 rounded-lg bg-cyan-500/20">
                        <Cloud className="w-5 h-5 text-cyan-400" />
                      </div>
                      <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/20 py-0 text-[10px] h-6 flex items-center gap-1">
                        <Cloud className="w-3 h-3" /> On-Demand
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold break-all">Deploy "{searchQuery}"</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      Deploy this model directly from the Ollama library. It will be downloaded on-demand upon first deployment.
                    </p>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-white/5 mt-auto">
                    <Link href="/dashboard/deployments" className="w-full">
                      <Button className="w-full gap-2 bg-cyan-500 text-black hover:bg-cyan-400 transition-colors">
                        <Play className="w-4 h-4 fill-current" /> Deploy Custom Model
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="w-full border-t border-white/10 py-8 bg-black/80">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <Terminal className="w-4 h-4" />
            <span className="text-sm font-medium">LuminaDeploy &copy; 2026</span>
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">GitHub</Link>
          </div>
        </div>
      </footer>

      {/* Model Details Modal */}
      {selectedModel && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedModel(null)}
          />
          <div className="relative z-10 w-full max-w-lg glass-card bg-[#050505] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {selectedModel.featured && (
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/20 blur-[60px] rounded-full pointer-events-none" />
            )}
            
            <div className="p-6 border-b border-white/10 flex justify-between items-start relative">
              <div>
                <div className="flex gap-2 items-center mb-2">
                  <div className="p-1.5 rounded-md bg-white/5">
                    {selectedModel.icon}
                  </div>
                  <Badge variant="outline" className="bg-white/5 text-zinc-300 border-white/10">
                    {selectedModel.tag}
                  </Badge>
                  {selectedModel.isPreCached && (
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                      Pre-cached
                    </Badge>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white">{selectedModel.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedModel(null)}
                className="p-1.5 rounded-md text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6 relative">
              <p className="text-zinc-300 text-sm">{selectedModel.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                  <div className="text-zinc-500 text-xs font-medium mb-1 uppercase tracking-wider">Parameters</div>
                  <div className="text-white font-mono text-lg">{selectedModel.parameters}</div>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                  <div className="text-zinc-500 text-xs font-medium mb-1 uppercase tracking-wider">Context Window</div>
                  <div className="text-white font-mono text-lg">{selectedModel.contextWindow}</div>
                </div>
                <div className="bg-black/40 border border-white/5 rounded-xl p-4 col-span-2 flex items-center justify-between">
                  <div>
                    <div className="text-zinc-500 text-xs font-medium mb-1 uppercase tracking-wider">Expected Perf.</div>
                    <div className="text-cyan-400 font-mono text-lg">{selectedModel.expectedTps}</div>
                  </div>
                  {selectedModel.parameterCount > 12 && (
                    <div className="text-right">
                      <div className="text-amber-400 flex items-center gap-1.5 text-xs font-medium justify-end">
                        <AlertTriangle className="w-3.5 h-3.5" /> CPU Bottleneck
                      </div>
                      <div className="text-zinc-500 text-[10px] mt-1 max-w-[120px]">
                        Consider upgrading to GPU tier for optimal TPS.
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-white/10 bg-black/40 flex items-center justify-between relative">
              <div>
                <div className="text-2xl font-bold text-white">{selectedModel.rate}</div>
                <div className="text-xs text-zinc-500">per hour active</div>
              </div>
              <Link href="/dashboard/wallet" onClick={() => setSelectedModel(null)}>
                <Button className="gap-2 bg-cyan-500 text-black hover:bg-cyan-400 font-semibold px-6">
                  <Play className="w-4 h-4 fill-current" /> Deploy Instance
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
