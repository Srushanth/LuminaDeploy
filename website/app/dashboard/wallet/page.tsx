"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Battery, BatteryCharging, CreditCard, X, Zap } from "lucide-react";

export default function WalletPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [credits, setCredits] = useState(12.45);
  const maxCredits = 50.00;
  
  // Calculate percentage for the gas tank
  const percentage = Math.min(100, Math.max(0, (credits / maxCredits) * 100));

  const transactions = [
    { id: "tx-1", desc: "Llama 3 Deployment", duration: "4.5 hours", cost: "$0.23", date: "Today, 14:30", type: "consumption" },
    { id: "tx-2", desc: "Mistral 7B Training", duration: "1.2 hours", cost: "$0.05", date: "Yesterday, 09:15", type: "consumption" },
    { id: "tx-3", desc: "Top Up - Credit Card", duration: "-", cost: "+$20.00", date: "May 9, 2026", type: "topup" },
    { id: "tx-4", desc: "Phi-3 Mini Serverless", duration: "12 hours", cost: "$0.24", date: "May 8, 2026", type: "consumption" },
  ];

  const handleTopUp = (amount: number) => {
    setCredits((prev) => prev + amount);
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Wallet & Billing</h1>
        <p className="text-zinc-400">Manage your compute credits and view transaction history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Gas Tank UI */}
        <Card className="glass-card md:col-span-2 bg-transparent text-white border-white/10 relative overflow-hidden">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Battery className="w-5 h-5 text-purple-400" />
                  Compute Gas Tank
                </CardTitle>
                <CardDescription className="text-zinc-400 mt-1">Pre-paid balance for deployments</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">${credits.toFixed(2)}</div>
                <div className="text-sm text-zinc-500">Available</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* The Gradient Progress Bar */}
            <div className="relative h-8 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-1">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-400 transition-all duration-1000 ease-out relative shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                style={{ width: `${percentage}%` }}
              >
                {/* Glossy overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full" />
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:20px_20px] opacity-20" />
              </div>
            </div>
            <div className="flex justify-between mt-2 text-xs font-medium text-zinc-500">
              <span>Empty</span>
              <span>${maxCredits.toFixed(2)} (Full)</span>
            </div>
          </CardContent>
        </Card>

        {/* Action Card */}
        <Card className="glass-card bg-transparent text-white border-white/10 flex flex-col justify-center items-center text-center p-6">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Need more compute?</h3>
          <p className="text-sm text-zinc-400 mb-6">Top up your gas tank to keep endpoints running without interruption.</p>
          <Button onClick={() => setIsModalOpen(true)} className="w-full gap-2 bg-white text-black hover:bg-zinc-200">
            <CreditCard className="w-4 h-4" /> Top Up Balance
          </Button>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="glass-card bg-transparent text-white border-white/10">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription className="text-zinc-400">Recent usage and top-ups</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-zinc-400">Description</TableHead>
                <TableHead className="text-zinc-400">Date</TableHead>
                <TableHead className="text-zinc-400">Duration</TableHead>
                <TableHead className="text-right text-zinc-400">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="border-white/5 hover:bg-white/5">
                  <TableCell className="font-medium flex items-center gap-2">
                    {tx.type === "consumption" ? (
                      <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-transparent text-[10px] uppercase">Usage</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-transparent text-[10px] uppercase">Credit</Badge>
                    )}
                    {tx.desc}
                  </TableCell>
                  <TableCell className="text-zinc-400">{tx.date}</TableCell>
                  <TableCell className="text-zinc-400">{tx.duration}</TableCell>
                  <TableCell className={`text-right font-medium ${tx.type === 'topup' ? 'text-emerald-400' : 'text-zinc-300'}`}>
                    {tx.type === "consumption" && "-"}{tx.cost}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Top Up Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <Card className="w-full max-w-md bg-[#0a0a0a] border border-white/10 text-white shadow-2xl shadow-cyan-500/10">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl">Top Up Balance</CardTitle>
                <CardDescription className="text-zinc-400 mt-1">Select an amount to add to your gas tank.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-white rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {[10, 20, 50].map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    onClick={() => handleTopUp(amount)}
                    className="h-24 flex flex-col items-center justify-center gap-2 border-white/10 bg-white/5 hover:bg-cyan-500/20 hover:border-cyan-500/50 hover:text-cyan-300 transition-all"
                  >
                    <span className="text-2xl font-bold">${amount}</span>
                  </Button>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-sm text-cyan-200 flex items-start gap-3">
                <BatteryCharging className="w-5 h-5 shrink-0 text-cyan-400" />
                <p>Funds are instantly added to your gas tank and can be used for any model deployment.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
