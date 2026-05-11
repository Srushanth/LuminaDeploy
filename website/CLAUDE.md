# CLAUDE.md: LuminaDeploy Development Rules

## 🛠 Project Commands

- **Install Dependencies:** `npm install`
- **Development Server:** `npm run dev`
- **Build Web:** `npm run build`
- **Linting:** `npm run lint` or `npx eslint .`
- **Type Check:** `npx tsc --noEmit`
- **GCP Context:** `gcloud config set project [PROJECT_ID]`
- **K8s Context:** `kubectl get pods -n lumina-prod`

## 🏗 Coding Standards

- **Style:** Functional React components with TypeScript. Prefer **Arrow Functions**.
- **Next.js:** Use **App Router** (`app/` directory).
- **Styling:** **Tailwind CSS** only. Use **shadcn/ui** components for the dashboard.
- **State:** Use `React.useContext` for global UI state; avoid prop drilling.
- **Types:** Use **Interfaces** for public APIs/Props and **Types** for internal unions/data structures.
- **Errors:** Use Try/Catch blocks in Server Actions and return formatted error objects to the UI.

## 📂 Directory Structure

- `app/`: Next.js routes and layouts.
- `components/`: UI components (keep `ui/` folder for shadcn).
- `lib/`: Utility functions (GCP SDK, Ollama API wrappers).
- `hooks/`: Custom React hooks (e.g., `useDeploymentStatus`).
- `types/`: Global TypeScript definitions.

## 🤖 Behavior & Context

- **Expert Mode:** Assume the user is an **MLOps/NVIDIA Certified expert**. Do not explain basic concepts like RAG or VRAM.
- **GCP Priority:** Always suggest **GKE (Google Kubernetes Engine)** for orchestration. Use **Workload Identity** for permissions.
- **Inference Logic:**
  - Phase 1: Focus on **Ollama** integration via REST API.
  - Phase 2: Focus on **vLLM/NIM** on G2-standard (L4) nodes.
- **Billing:** The platform uses a "Credit/Gas" model. Ensure UI components reflect "Cost per Hour" clearly.

## 💅 UI/UX Preferences

- **Theme:** Dark mode by default. Brand colors: Deep Charcoal, Neon Cyan, and Luminous Purple.
- **Visuals:** Use glowing borders and subtle glassmorphism for the "Deploy" cards.
- **Responsiveness:** Dashboard must be fully responsive (Mobile-first).

## ⚠️ Important Constraints

- **NO Post-paid Billing:** Never suggest designs that allow users to deploy before checking credit balance.
- **NO AWS/Azure:** If the task involves cloud infra, use **GCP SDK** or **Terraform (GCP Provider)**.
- **CLI:** When providing commands, assume a **Bash/MINGW64** environment.
