# Vibe-Coding Production Playbook & Reference Guide

This document captures core operational patterns, prompt chains, tool stacks, and scaling roadmaps for building high-quality, production-ready web applications.

---

## Part 1: 7 Recurring Problems in Vibe-Coded Apps

| # | Problem | Risk & Detail | Verification & Fix Step |
|---|---|---|---|
| **1** | **Secrets in Code** | API keys left in frontend or committed to repo. | Search codebase for `sk-`, `secret`, `password`. Rotate real values immediately. |
| **2** | **UI-Only Security** | Hiding UI elements without server-side permission checks. | Enforce server-side authorization on every API endpoint regardless of UI state. |
| **3** | **Cross-User Data Access** | Missing multi-tenant isolation or broken ID-based access controls. | Create two test accounts; verify Account B cannot query Account A's resources by ID. |
| **4** | **Zero Error Tracking** | Silent failures leading to user churn without feedback. | Install error tracking (e.g., Sentry) before launch. |
| **5** | **Unrestored Backups** | Having backup configurations that have never been validated. | Run a full test restore to verify data recoverability. |
| **6** | **Client-Side Payments** | Trusting client prices or unverified webhooks. | Set prices server-side; strictly verify payment provider webhook signatures (e.g. Stripe). |
| **7** | **Silent AI Rewrites** | AI model modifying unmonitored code sections during edits. | Set up Playwright visual regression / screenshot tests on top key pages. |

---

## Part 2: 7 Sequential Prompts for Webpage Generation

Execute these prompts in sequence to take a product landing page from concept to production polish:

1. **Concept & Storytelling**: Act as an award-winning launch creative director. Define 3D concept, hero, typography, color system, scroll narrative, and CTA strategy.
2. **Conversion Architecture**: Act as a conversion UX strategist. Map hero, problem/solution, proof, demo, objections, pricing, FAQ, and CTA.
3. **3D Hero Section**: Act as an elite 3D web designer. Build a cinematic hero around a memorable 3D visual, paired with headline, copy, and CTA.
4. **Scroll Narrative & Interactions**: Act as an interaction designer. Define scroll triggers, pins, transitions, parallax, text reveals, and camera movement.
5. **Sequential Engineering**: Act as a senior AI web engineer. Write sequential prompts for structure, responsive UI, 3D visuals, forms, SEO, and performance.
6. **CRO Optimization**: Act as a CRO strategist. Audit messaging clarity, hierarchy, CTA placement, friction, proof, and pricing flow.
7. **Final Polish & QA**: Act as creative director and QA engineer. Audit typography, spacing, 3D rendering, animation, responsive behavior, accessibility (a11y), and performance.

---

## Part 3: Vibe-Coding Production Tool Stack

| Tool | Category / Purpose | When to Use |
|---|---|---|
| **UI UX Pro Max** | Design System & UX Guidance | When agent frontend output looks visually inconsistent or generic |
| **Ponytail** | Code Reusability Ruleset | To prevent agent from over-engineering or duplicating helper functions |
| **GitHub Spec Kit** | Spec-Driven Toolkit | Before handing ambiguous features to coding agents |
| **Task Master** | PRD to Task Queue | When breaking down complex builds into structured sub-tasks |
| **Serena** | Semantic Code Search | Symbol-based code navigation in large codebases |
| **Understand Anything** | Codebase Knowledge Graph | Visualizing dependencies in unfamiliar repositories |
| **Superpowers** | Agent Workflow Patterns | Structured workflows for TDD, planning, and code review |
| **gstack** | Claude Code Workflow OS | Opinionated workflow for planning, building, QA, and shipping |
| **Trail of Bits Skills** | Security Audit Skills | AI-assisted security audits prior to release |
| **Strix** | Autonomous AI Pentester | Dynamic testing on authorized target environments |

---

## Part 4: Backend Scaling Roadmap

- **1K Users**: Single node server (Express / Fastify).
- **10K Users**: Add Redis caching & connection pooling (e.g., PgBouncer).
- **50K Users**: Add horizontal scaling & load balancer (Nginx / cloud LB).
- **100K Users**: Add database read replicas & index tuning.
- **500K Users**: Add asynchronous event queues (BullMQ, Kafka).
- **1M+ Users**: Implement distributed API gateways & database sharding.
