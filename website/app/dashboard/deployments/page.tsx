import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DeploymentsPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Deployments</h1>
        <p className="text-zinc-400">Manage your active LLM endpoints and view metrics.</p>
      </div>

      <Card className="glass-card bg-transparent text-white border-white/10">
        <CardHeader>
          <CardTitle>Active Endpoints</CardTitle>
          <CardDescription className="text-zinc-400">You currently have no active deployments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center border border-dashed border-white/20 rounded-lg bg-white/5">
            <span className="text-zinc-500">Deployment list placeholder</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
