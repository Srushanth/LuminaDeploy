# LuminaDeploy 💡

> **The Developer's Sandbox for Private LLM Endpoints.**

LuminaDeploy is a UI-based platform built on Google Cloud Platform (GCP) that allows developers to spin up dedicated, private LLM endpoints in seconds. No more managing raw GPU instances or dealing with unpredictable per-token pricing.

## 🚀 The Roadmap

### Phase 1: The "Lite" Sandbox (In Progress)

- **Engine:** Ollama (CPU-based inference).
- **Goal:** Low-cost testing and logic validation.
- **Hardware:** GKE Autopilot / High-mem CPU nodes.

### Phase 2: The "Production" Engine (Upcoming)

- **Engine:** vLLM / NVIDIA Inference Microservices (NIM).
- **Goal:** High-throughput, production-grade endpoints.
- **Hardware:** NVIDIA L4 & A100 GPUs.

## 🛠️ Tech Stack

- **Frontend:** Next.js 15+, TypeScript, Tailwind.
- **Orchestration:** Kubernetes (GKE).
- **Cloud:** Google Cloud Platform.
- **Billing:** Stripe (Credit-based hourly metering).

## 📂 Repository Structure

- `/website`: The Next.js frontend dashboard.
- `/infra`: (Planned) Terraform/Pulumi scripts for GCP resources.
- `/backend`: (Planned) The Python/Go orchestrator for managing GKE pods.
