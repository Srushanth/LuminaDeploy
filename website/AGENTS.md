# AGENTS.md: LuminaDeploy Context & Standards

## 🎯 Project Mission

LuminaDeploy is a UI-driven, pay-per-hour platform for deploying LLM endpoints.

- **Phase 1:** CPU-only inference via Ollama.
- **Phase 2:** GPU-accelerated inference (NVIDIA L4/A100) via vLLM/NIM.

## 🛠️ Technology Stack & Constraints

When generating code or architectural advice, adhere to these strictly:

- **Cloud Provider:** Google Cloud Platform (GCP). **DO NOT** suggest AWS or Azure solutions.
- **Orchestration:** Kubernetes (GKE). Focus on GKE Autopilot for Phase 1 and GKE Standard for Phase 2.
- **Frontend:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui.
- **State Management:** Use modern React patterns (Hooks/Context). Avoid Redux unless explicitly asked.
- **Inference Engines:**
  - Phase 1: Ollama (running in Docker/K8s pods).
  - Phase 2: vLLM, TensorRT-LLM, NVIDIA NIM.

## 🏗️ Architectural Principles

1. **Scale-to-Zero:** The platform must support "Sleep/Wake" cycles. If no API traffic is detected, the deployment should scale to zero replicas to save user costs.
2. **OpenAI Compatibility:** All generated endpoints MUST be 100% compatible with the OpenAI API specification (`/v1/chat/completions`).
3. **Security First:**
   - Never hardcode GCP Service Account keys.
   - Use Workload Identity for GKE-to-GCP resource access.
   - Implement strict egress firewalls for user pods.

## 💻 Coding Standards (Frontend)

- **Component Structure:** Use the `app/` directory (App Router). Keep components small and functional.
- **TypeScript:** Strict typing is mandatory. Avoid `any` at all costs.
- **Server Components:** Prefer Server Components for data fetching; use Client Components (`"use client"`) only for interactivity.
- **Theming:** Default to a high-contrast Dark Mode (Luminous/Neon accents) to match the "Lumina" brand.

## 🧠 Domain Knowledge

Agents should be aware of the following concepts:

- **MLOps:** CI/CD for model weights, versioning, and monitoring.
- **NVIDIA GPU Specs:** VRAM constraints of L4 (24GB) vs. A100 (40/80GB).
- **RAG:** Modular and Agentic RAG structures (LlamaIndex experience is preferred).
- **Billing:** Credit-based "Gas Tank" model. Metering is handled by a sidecar or a central orchestrator.

## 🤖 Communication Protocol

- **Be Concise:** I am an expert AI/ML Engineer. Skip the "I hope this helps" and "As an AI..." filler.
- **Direct Logic:** Focus on the "How" and the "Why."
- **Terminal Preference:** Use Bash/MINGW64 commands (as per the local setup).
