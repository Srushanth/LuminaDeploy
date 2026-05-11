import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ApiKeysPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">API Keys</h1>
        <p className="text-zinc-400">Manage your secret keys for accessing LuminaDeploy endpoints.</p>
      </div>

      <Card className="glass-card bg-transparent text-white border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Secret Keys</CardTitle>
            <CardDescription className="text-zinc-400">Do not share your API keys with others.</CardDescription>
          </div>
          <Button className="bg-cyan-500 text-black hover:bg-cyan-400">Create new secret key</Button>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center border border-dashed border-white/20 rounded-lg bg-white/5">
            <span className="text-zinc-500">API keys list placeholder</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
