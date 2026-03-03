# Copilot — Focused Guide

Purpose
- Provide concise, repository-specific guidance for using Copilot/GitHub Copilot with this codebase.

How to use
- When opening an issue or editing code, start prompts with context (file path, brief goal).
- Keep prompts focused: one task per prompt, include expected inputs/outputs.

Prompt templates
- Fix a bug: "In [src/path/file.ts], function X does Y but returns Z. Provide a minimal patch to fix and explain the change." 
- Add feature: "Add endpoint POST /items to [src/module]. Describe API, implement handler, and add tests." 

Examples
- Small change: provide the filename and a 2-3 sentence description of the desired change.
- Refactor: include the public API contract you must preserve.

Best practices
- Prefer small, incremental changes and show before/after snippets.
- Run tests locally after edits and include failing test output when asking for fixes.
- Avoid broad prompts like "Rewrite the project" — split into targeted tasks.

Quick commands
- Run tests: `npm test` or `npm run test:e2e` depending on context.
- Lint: `npm run lint`.

If you want, I can add repository-specific prompt examples for the NestJS service in this repo.
