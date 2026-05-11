import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Shield, Mail } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Account Settings</h1>
        <p className="text-zinc-400">Manage your profile, authentication, and preferences.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-card md:col-span-2 bg-transparent text-white border-white/10">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription className="text-zinc-400">Update your account details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center border border-cyan-500/50">
                <User className="w-8 h-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="font-medium text-lg">NVIDIA Expert User</h3>
                <p className="text-sm text-zinc-400">expert@luminadeploy.com</p>
              </div>
            </div>

            {/* Placeholder for Clerk/NextAuth UserProfile component */}
            <div className="p-6 border border-dashed border-white/20 rounded-lg bg-white/5 flex flex-col items-center justify-center text-center space-y-2">
              <Shield className="w-8 h-8 text-zinc-500" />
              <h4 className="font-medium">Authentication Provider Integration</h4>
              <p className="text-sm text-zinc-400 max-w-sm">
                Placeholder for <code>&lt;UserProfile /&gt;</code> component from Clerk or NextAuth. 
                This section will handle password changes, MFA, and connected accounts.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card bg-transparent text-white border-white/10 flex flex-col">
          <CardHeader>
            <CardTitle>Security</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-zinc-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Email Verification</h4>
                <p className="text-xs text-emerald-400 mt-1">Verified</p>
              </div>
            </div>
            <div className="flex items-start gap-3 mt-4">
              <Shield className="w-5 h-5 text-zinc-400 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">Two-Factor Auth</h4>
                <p className="text-xs text-zinc-500 mt-1">Not configured</p>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10">
              <Button variant="outline" className="w-full text-red-400 border-red-500/20 hover:bg-red-500/10 hover:text-red-300">
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
