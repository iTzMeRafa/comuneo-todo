# Comuneo To-Do App

A simple recursive to-do list web app built with **Remix.run**, **TypeScript**, and **Appwrite**. Users can create tasks and nested sub-tasks, manage them, and persist data across sessions.

## Features
- User signup & authentication via Appwrite
- Add, complete, delete tasks and sub-tasks recursively
- Welcome email on signup using Appwrite Functions
- Client/server form validation
- Basic UI testing

## Tech Stack
- Frontend: Remix.run + TypeScript
- Backend: Appwrite (Auth, Database, Functions)
- Testing: Vitest

## Getting Started
1. Clone the repo and install dependencies:
   ```bash
   git clone <repo-url>
   cd comuneo
   yarn install
   ```
2. Configure Appwrite (endpoint, project ID, API key) in .env
    ```bash
   yarn dev
   ```
