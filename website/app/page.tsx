import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Box, Terminal, ArrowRight, Server, Play } from "lucide-react";
import Link from "next/link";

const models = [
  {
    id: "llama3-8b",
    name: "Llama 3 8B",
    tag: "Ollama/CPU",
    rate: "$0.05",
    description: "Highly capable general purpose open-source model by Meta.",
    icon: <Box className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: "mistral-7b",
    name: "Mistral 7B",
    tag: "Ollama/CPU",
    rate: "$0.04",
    description: "Fast, efficient, and powerful for a wide variety of tasks.",
    icon: <Zap className="w-5 h-5 text-amber-400" />,
  },
  {
    id: "mixtral-8x7b",
    name: "Mixtral 8x7b",
    tag: "Ollama/CPU",
    rate: "$0.15",
    description: "High quality sparse mixture of experts model.",
    icon: <Server className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: "phi-3-mini",
    name: "Phi-3 Mini",
    tag: "Ollama/CPU",
    rate: "$0.02",
    description: "Lightweight, highly efficient model by Microsoft.",
    icon: <Cpu className="w-5 h-5 text-blue-400" />,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-cyan-500/30">
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
            <Button variant="outline" className="hidden sm:inline-flex border-white/20 hover:bg-white/10 text-white">Sign In</Button>
            <Button className="bg-cyan-500 text-black hover:bg-cyan-400">Get Started</Button>
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
              <Button size="lg" className="gap-2 text-md font-semibold px-8 bg-cyan-500 text-black hover:bg-cyan-400">
                Deploy Now <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2 text-md px-8 border-white/20 text-white hover:bg-white/10">
                View Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Model Gallery Section */}
        <section className="w-full py-16 md:py-24 bg-black/40 border-t border-white/5 relative z-10">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Discover Models</h2>
              <p className="text-zinc-400 max-w-2xl">
                Choose from our curated collection of optimized open-source models. 
                Ready for production deployment instantly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {models.map((model) => (
                <Card key={model.id} className="glass-card flex flex-col bg-transparent text-white border-white/10 group">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="p-2 rounded-lg bg-white/5 group-hover:bg-cyan-500/10 transition-colors">
                        {model.icon}
                      </div>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border-transparent hover:bg-cyan-500/30">{model.tag}</Badge>
                    </div>
                    <CardTitle className="text-xl font-bold">{model.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-zinc-400 leading-relaxed">{model.description}</p>
                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-white">{model.rate}</span>
                      <span className="text-sm text-zinc-500">/ hr</span>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4 border-t border-white/5 mt-auto">
                    <Button className="w-full gap-2 bg-white/5 text-white hover:bg-cyan-500 hover:text-black transition-colors border border-white/10 group-hover:border-cyan-500/50">
                      <Play className="w-4 h-4 fill-current" /> Deploy Model
                    </Button>
                  </CardFooter>
                </Card>
              ))}
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
    </div>
  );
}
